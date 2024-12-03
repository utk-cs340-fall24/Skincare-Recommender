import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from bson import ObjectId


class ProductRecommender:
    def __init__(self, products_df: pd.DataFrame):
        self.products_df = products_df

        # Prepare the ingredients data
        self.products_df["combined_ingredients"] = self.products_df["ingredients"].apply(
            lambda x: " ".join(x) if isinstance(x, list) else x
        )

        # Initialize and fit the TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer()
        self.tfidf_matrix = self.vectorizer.fit_transform(
            self.products_df["combined_ingredients"]
        )

    def recommend_products_for_user(self, user, k=9):
        # Filter products by allergies
        filtered_df = self.products_df.copy()
        for allergy in user.get_allergies():
            filtered_df = filtered_df[
                ~filtered_df["ingredients"].apply(
                    lambda ingredients: allergy in ingredients
                )
            ]

        # Filter by skin type
        user_skin_type = user.get_skin_type()
        filtered_df = filtered_df[
            filtered_df["skinType"].apply(
                lambda x: (x & user_skin_type) == user_skin_type
            )
        ]

        # Filter by skin concerns
        user_skin_concerns = user.get_concerns()
        filtered_df = filtered_df[
            filtered_df["concerns"].apply(
                lambda x: (x & user_skin_concerns) == user_skin_concerns
            )
        ]

        # If no previous products specified, return top-k rated products
        if not user.get_prev_products() or len(user.get_prev_products()) == 0:
            return filtered_df.nlargest(k, "rating")

        # Combine all ingredients from previous products
        prev_products_ingredients = []
        for prev_product_id in user.get_prev_products():
            product_indices = self.products_df[
                self.products_df["_id"] == prev_product_id
            ].index
            if not product_indices.empty:
                prev_product_index = product_indices[0]
                prev_product_ingredients = self.products_df.loc[
                    prev_product_index, "ingredients"
                ]
                prev_products_ingredients.extend(prev_product_ingredients)

        # Join the combined ingredients into a single string
        combined_ingredients = " ".join(prev_products_ingredients)

        # Vectorize the combined ingredients for the user
        user_vectorized_data = self.vectorizer.transform([combined_ingredients])

        # Compute cosine similarity for the user and filtered products
        filtered_indices = filtered_df.index
        filtered_vectorized_data = self.tfidf_matrix[filtered_indices]
        similarity_matrix = cosine_similarity(
            user_vectorized_data, filtered_vectorized_data
        )

        # Sort products by similarity to the user and return top-k
        similarity_scores = list(enumerate(similarity_matrix[0]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Get the indices of the top-k similar products
        top_k_indices = [filtered_indices[i[0]] for i in similarity_scores[:k]]

        # Select the top-k similar products from the filtered DataFrame
        recommended_products_df = filtered_df.loc[top_k_indices].copy()

        # Add similarity scores for the recommended products
        recommended_products_df["similarity_score"] = [
            similarity_matrix[0][i[0]] for i in similarity_scores[:k]
        ]

        return recommended_products_df

    def recommend_similar_products(self, productID, k=3):
        # Ensure productID is in the format of ObjectId
        product_id_obj = ObjectId(productID)

        # Look up the product by _id field
        product_indices = self.products_df[
            self.products_df["_id"] == product_id_obj
        ].index

        if product_indices.empty:
            raise ValueError(f"Product with ID '{productID}' not found in the dataset.")

        product_index = product_indices[0]

        # Compute cosine similarity on the precomputed TF-IDF matrix
        similarity_matrix = cosine_similarity(self.tfidf_matrix)

        similarity_scores = list(enumerate(similarity_matrix[product_index]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Exclude the product itself and get the indices of the top-k similar products
        similar_products_indices = [
            i[0] for i in similarity_scores if i[0] != product_index
        ][:k]

        similar_products_df = self.products_df.iloc[similar_products_indices].copy()

        similar_products_df["similarity_score"] = [
            similarity_scores[i][1] for i in range(len(similar_products_indices))
        ]

        return similar_products_df
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from bson import ObjectId

class ProductRecommender:
    def __init__(self, products_df):
        self.df = products_df
        self.scaler = StandardScaler()
        self.vectorizer = TfidfVectorizer()

        # Join the ingredients list into a single string for each product
        ingredients_data = self.df['ingredients'].apply(lambda x: " ".join(x) if isinstance(x, list) else x)
        
        # Perform TF-IDF vectorization
        self.vectorized_data = self.vectorizer.fit_transform(ingredients_data)
    
    def recommend_similar_products(self, productID, k=5):
        # Ensure productID is in the format of ObjectId
        product_id_obj = ObjectId(productID)
        
        # Compute cosine similarity on the vectorized data
        similarity_matrix = cosine_similarity(self.vectorized_data)

        # Look up the product by _id field, which is the default identifier for MongoDB
        product_indices = self.df[self.df['_id'] == product_id_obj].index
        if product_indices.empty:
            raise ValueError(f"Product with ID '{productID}' not found in the dataset.")
        
        product_index = product_indices[0]
        similarity_scores = list(enumerate(similarity_matrix[product_index]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Exclude the product itself and get the indices of the top-k similar products
        similar_products_indices = [i for i in similarity_scores if i[0] != product_index][:k]
        similar_products_df = self.df.iloc[[i[0] for i in similar_products_indices]].copy()
        similar_products_df['similarity_score'] = [i[1] for i in similar_products_indices]
        
        return similar_products_df
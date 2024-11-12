import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
import time

from typing import List
# from ..models.product import Product

class ProductRecommender:
    def __init__(self, data_path):
        self.df = pd.read_csv(data_path)
        self.scaler = StandardScaler()
        self.vectorizer = TfidfVectorizer()
        ingredients_data = self.df['ingredients'].apply(lambda x: " ".join(x.strip("[]").replace("'", "").split(",")))
        self.vectorized_data = self.vectorizer.fit_transform(ingredients_data)
    
    def recommend_products(self, product_name, k=5):
        # Compute cosine similarity on the selected data
        similarity_matrix = cosine_similarity(self.vectorized_data)
        product_indices = self.df[self.df['name'] == product_name].index
        if product_indices.empty:
            raise ValueError(f"Product '{product_name}' not found in the dataset.")
        product_index = product_indices[0]
        similarity_scores = list(enumerate(similarity_matrix[product_index]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Exclude the product itself and get the indices of the top-k similar products
        similar_products_indices = [i for i in similarity_scores if i[0] != product_index][:k]
        similar_products_df = self.df.iloc[[i[0] for i in similar_products_indices]].copy()
        similar_products_df['similarity_score'] = [i[1] for i in similar_products_indices]
        
        return similar_products_df
    
    def print_products(self, products_df):
        """Prints a list of recommended products in a user-friendly format."""
        for i, (_, row) in enumerate(products_df.iterrows(), start=1):
            print(f"{i}. {row['name']} by {row['brand']}")
            print(f"   - Similarity Score: {row['similarity_score']:.2f}")
            # print(f"   - Ingredients: {row['ingredients']}")
            print(f"   - Category: {row['category']}")
            print(f"   - Skin Type: {row['skintype']}")
            print(f"   - Concerns: {row['concerns']}")
            print(f"   - Price: ${row['price']:.2f}")
            print(f"   - Rating: {row['rating']}\n")

if __name__ == '__main__':
    # Initialize the recommender with your data file path
    time_start = time.time()
    recommender = ProductRecommender('../../data_cleaning/modified_dataset_v5.csv')
    time_end = time.time()
    print(f"Recommender initialized in {time_end - time_start:.2f} seconds.")
    # User input loop to recommend similar products
    while True:
        user_input = input('Enter the product name (or type "exit" to quit): ')
        time_start = time.time()
        if user_input.lower() == 'exit':
            break

        try:
            recommended_products = recommender.recommend_products(user_input, k=2)
            time_end = time.time()
            print(f"Recommendations generated in {time_end - time_start:.2f} seconds.")
            recommender.print_products(recommended_products)
        except ValueError as e:
            print(e)
        except Exception as e:
            print("An unknown error occurred:", e)
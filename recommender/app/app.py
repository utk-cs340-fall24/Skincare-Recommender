import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from pathlib import Path

from services.recommender import Recommendation
from models.user import User
from models.product import Product

app = Flask(__name__)

# Load environment variables from the .env file located in 'recommender'
env_path = Path(__file__).resolve().parent.parent / '.env'  
load_dotenv(dotenv_path=env_path)

# Get the MongoDB URI from environment variables
mongodb_uri = os.getenv("MONGODB_URI")

# Connect to MongoDB using the URI
client = MongoClient(mongodb_uri)
db = client.get_database()  # Assuming db name is not specified

# Collection references
users_collection = db["users"]
products_collection = db["products"]

@app.route("/recommender/<userid>", methods=["GET"])
def recommend(userid):
    # Fetch user data from the MongoDB users collection
    user_data = users_collection.find_one({"uid": userid})

    if not user_data:
        return jsonify({"message": "User not found"}), 404

    # Fetch product data from the MongoDB products collection
    products_data = products_collection.find({})  # Modify this query as needed

    # Map the products data to Product objects
    product_objects = [Product(**product) for product in products_data]

    # Create User object from the fetched user data
    user = User(**user_data)

    # Generate product recommendations
    # recommendation_model = Recommendation(user, product_objects)
    # recommended_products = recommendation_model.recommend_products()

    # Return recommended product names
    # recommended_product_names = [product.name for product in recommended_products]
    # return jsonify(recommended_product_names)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

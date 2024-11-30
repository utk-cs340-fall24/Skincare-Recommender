from flask import Flask, jsonify, request
from pymongo import MongoClient
import pandas as pd
from bson import ObjectId
import services.recommender as recommender
from services.recommender import ProductRecommender
from models.user import User
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
mongo_uri = os.getenv("MONGO_URI")


try:
    client = MongoClient(mongo_uri)
    if not client:
        raise ValueError("MongoDB connection failed.")
    db = client.get_database("test")
    users_collection = db["users"]
    products_collection = db["products"]
    ingredients_collection = db["ingredients"]

    # Load product data from MongoDB into a DataFrame
    products_data = list(products_collection.find())
    if not products_data:
        raise ValueError("No product data available in MongoDB.")

    # Load ingredients data from MongoDB into a DataFrame
    ingredients_data = list(ingredients_collection.find())
    if not ingredients_data:
        raise ValueError("No ingredients data available in MongoDB.")

    # Convert to DataFrame
    products_df = pd.DataFrame(products_data)

    # Initialize recommender with the DataFrame
    recommender = ProductRecommender(products_df)

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)


@app.route("/recommender", methods=["GET"])
def home():
    return jsonify({"message": "Recommender is up and running"}, 200)


@app.route("/recommender/<userid>", methods=["GET"])
def recommend(userid):
    if not userid:
        return jsonify({"message": "User ID is required"}), 400

    try:
        # Convert string to ObjectId
        try:
            user_id_obj = ObjectId(userid)
        except Exception as e:
            return jsonify({"message": f"Invalid user ID format: {str(e)}"}), 400

        # Find the user by ObjectId
        user_data = users_collection.find_one({"_id": user_id_obj})

        if not user_data:
            return jsonify({"message": "User not found"}), 404

        # Create the User object
        user = User(
            user_data["_id"],
            user_data["skinType"],
            user_data["concerns"],
            user_data["allergies"],
            user_data["prevProducts"],
        )

        # Get product recommendations from the recommender
        recommended_products_df = recommender.recommend_products_for_user(user)

        if recommended_products_df.empty:
            return jsonify({"message": "No recommendations found."}), 404

        # Convert DataFrame to dictionary and ensure ObjectIds are converted to strings
        response_data = recommended_products_df.to_dict(orient="records")
        for record in response_data:
            if "_id" in record:
                record["_id"] = str(record["_id"])

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"message": f"An unknown error occurred: {str(e)}"}), 500


@app.route("/recommender/similar/<productID>", methods=["GET"])
def get_similar_products(productID):
    if not productID:
        return jsonify({"message": "Product ID is required"}), 400

    try:
        # Get similar products from the recommender
        similar_products_df = recommender.recommend_similar_products(productID)

        if similar_products_df.empty:
            return jsonify({"message": "No similar products found."}), 404

        # Convert DataFrame to dictionary and ensure ObjectIds are converted to strings
        response_data = similar_products_df.to_dict(orient="records")
        for record in response_data:
            if "_id" in record:
                record["_id"] = str(record["_id"])

        return jsonify(response_data)
    except Exception as e:
        return jsonify({"message": f"An unknown error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

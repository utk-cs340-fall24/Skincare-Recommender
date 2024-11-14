from flask import Flask, jsonify, request
from pymongo import MongoClient
import pandas as pd
from bson import ObjectId
import services.recommender as recommender
from services.recommender import ProductRecommender
from models.product import Product

app = Flask(__name__)

mongo_uri = "mongodb+srv://alankhalili:fq0y7FsiyZneg1UI@skinrecs.emb1z.mongodb.net/?retryWrites=true&w=majority&appName=SKINrecs"


try:
    client = MongoClient(mongo_uri)
    if not client:
        raise ValueError("MongoDB connection failed.")
    db = client.get_database("test")
    users_collection = db["users"]
    products_collection = db["products"]
    
    # Load product data from MongoDB into a DataFrame
    products_data = list(products_collection.find())
    if not products_data:
        raise ValueError("No product data available in MongoDB.")

    # Convert to DataFrame
    products_df = pd.DataFrame(products_data)

    # Initialize recommender with the DataFrame
    recommender = ProductRecommender(products_df)

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)


@app.route("/", methods=["GET"])
def home():
    return "Recommender is running"

@app.route("/recommender/<userid>", methods=["GET"])
def recommend(userid):
    try:
        user_id_obj = ObjectId(userid)
    except Exception as e:
        return jsonify({"message": f"Invalid user ID format: {str(e)}"}), 400

    # Find the user by ObjectId
    user_data = users_collection.find_one({"_id": user_id_obj})

    if not user_data:
        return jsonify({"message": "User not found"}), 404

    # TODO: Replace with actual recommendation logic
    mock_products = [
        {"name": "Moisturizing Lotion", "brand": "Brand A", "price": 19.99},
    ]

    return jsonify(mock_products)


@app.route("/products/similar/<productID>", methods=["GET"])
def get_similar_products(productID):
    if not productID:
        return jsonify({"message": "Product name is required"}), 400

    try:
        similar_products_df = recommender.recommend_similar_products(productID)
        
        # Convert DataFrame to dictionary with ObjectIds as strings
        response_data = similar_products_df.to_dict(orient='records')
        
        # Ensure any ObjectIds are converted to strings
        for record in response_data:
            if '_id' in record:
                record['_id'] = str(record['_id'])

        return jsonify(response_data)
        
    except ValueError as e:
        return jsonify({"message": str(e)}), 404
    except Exception as e:
        return jsonify({"message": "An unknown error occurred: " + str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)

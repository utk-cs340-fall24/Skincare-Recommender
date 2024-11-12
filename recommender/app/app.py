from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId

from models.product import Product

app = Flask(__name__)

mongo_uri = None #replace with your uri


try:
    client = MongoClient(mongo_uri)
    db = client.get_database("test")
    users_collection = db["users"]
    products_collection = db["products"]
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


if __name__ == "__main__":
    app.run(debug=True, port=5000)

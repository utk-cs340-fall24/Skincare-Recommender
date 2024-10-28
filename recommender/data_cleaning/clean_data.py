import sys
import os
import pandas as pd
import ast

# Get the absolute path of the current script
current_script_path = os.path.abspath(__file__)

# Get the project root directory 
project_root = os.path.dirname(os.path.dirname(os.path.dirname(current_script_path)))

# Add the project root to the Python path
sys.path.append(project_root)

from shared.utils.constants import SKIN_TYPES, PRODUCT_CATEGORIES

# List of phrases in ingredient lists that we want to ignore
unwanted_phrases = ["No Info", "Visit the", "check out", "find more at", "see more at", "Please", "\\", ":", "Change" , "please", "change", "feel"]

# Function to check if ingredients list is valid
def is_valid_ingredients(ingredient_list):
    return not any(phrase in ingredient_list for phrase in unwanted_phrases)

# Function to process ingredients into a list of strings
def process_ingredients(ingredients):
    # Split the ingredients string by commas and strip whitespace
    return [ingredient.strip() for ingredient in ingredients.split(',')]

# Function to convert categories to their corresponding bitwise values
def process_categories(categories):
    bitwise_category = 0 
    categories_list = ast.literal_eval(categories)
    for category in categories_list:
        bitwise_category |= PRODUCT_CATEGORIES.get(category, 0)  
    return bitwise_category

# Function to convert skin types to their corresponding bitwise values
def process_skintypes(row):
    bitwise_skintype = 0 
    if row["Normal"]:
        bitwise_skintype |= SKIN_TYPES["NORMAL"]
    if row["Oily"]:
        bitwise_skintype |= SKIN_TYPES["OILY"]
    if row["Sensitive"]:
        bitwise_skintype |= SKIN_TYPES["SENSITIVE"]
    if row["Dry"]:  
        bitwise_skintype |= SKIN_TYPES["DRY"]
    return bitwise_skintype

# Read the CSV file
file_path = "modified_dataset_v1.csv"
try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    print(f"Error: The file {file_path} was not found.")
    sys.exit(1)

# Remove duplicates and rows with NaN values
df = df.drop_duplicates()
df = df.dropna()

# Filter the DataFrame to keep only valid ingredient lists
df = df[df["ingredients"].apply(is_valid_ingredients)]

# Initialize cleaned DataFrame using the product model schema
cleaned_df = pd.DataFrame(columns=["category", "skintype", "name", "brand", "price", "rating", "ingredients"])

# Assign values to the cleaned DataFrame
cleaned_df["category"] = df["Label"].apply(process_categories) 
cleaned_df["skintype"] = df.apply(process_skintypes, axis=1)
cleaned_df["name"] = df["name"]
cleaned_df["brand"] = df["brand"]
cleaned_df["price"] = df["price"]
cleaned_df["rating"] = df["rank"]

# TODO: Add additional logic for cleaning ingredients list 
cleaned_df["ingredients"] = df["ingredients"].apply(process_ingredients)

cleaned_df.to_csv("modified_dataset_v2.csv", index=False)



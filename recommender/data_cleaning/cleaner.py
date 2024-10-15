#cleaner file, takes in csv file and removes all duplicates and 
#categorizes things into correct product schema
#product schema is productId, price, ingredients, category, and skintype
#uses pandas to process the data
import pandas as pd

# Read the csv file
file_path = 'cosmetic_p.csv'  
df = pd.read_csv(file_path)

# removing duplicates
df = df.drop_duplicates()

# dropping rows with NaN values
df = df.dropna(subset=['price', 'ingredients'])

# assignign an id, starts at 1 and just iterates
df['productId'] = range(1, len(df) + 1)

#list of phrases in ingredient lists that we want to ignore
unwanted_phrases = ["No Info", "Visit the", "check out", "find more at", "see more at"]

# Function to check if ingredients list is valid
def is_valid_ingredients(ingredient_list):
    # return true if none of the unwanted phrases are found
    return not any(phrase in ingredient_list for phrase in unwanted_phrases)

# Filter the DataFrame to keep only valid ingredient lists
df = df[df['ingredients'].apply(is_valid_ingredients)]

# Creating a cleaned DataFrame including 'Label' as 'category'
df_cleaned = df[['productId', 'price', 'Label', 'ingredients']].copy()  # Use 'Label' as 'category'

# making ingredients to a list and handling NaN values
df_cleaned['ingredients'] = df_cleaned['ingredients'].fillna('').apply(lambda x: x.split(','))

# Create a skinType column based on the existing skin type columns
df_cleaned['skinType'] = df[['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']].apply(
    lambda x: 1 if x['Oily'] == 1 else 0, axis=1 
)

#saving cleaned version
df_cleaned.to_csv('cleaned_skincare_products.csv', index=False)

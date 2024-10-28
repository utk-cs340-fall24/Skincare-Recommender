import pandas as pd
import ast

ingredient_mapping = {
    "vitamin c": 16,
    "ascorbic acid": 16,
    "kojic acid": 16,
    "niacinamide": 24,
    "alpha arbutin": 16,
    "licorice root": 16,
    "azelaic acid": 25,
    "hyaluronic acid": 4,
    "ceramide": 4,
    "glycerin": 4,
    "squalane": 4,
    "shea": 4,
    "retinol": 2,
    "peptides": 2,
    "collagen": 2,
    "glycolic acid": 3,
    "lactic acid": 3,
    "salicylic acid": 1,
    "benzoyl peroxide": 1,
    "tea tree oil": 1,
    "sulfur": 1,
    "green tea": 25,
    "aloe": 12,
    "centella": 8,
    "zinc oxide": 9,
    "melaleuca alternifolia leaf": 1,
    "butyrospermum parkii": 4,
    "glycyrrhiza glabra root": 16,
    "camellia sinensis leaf": 25,
    "bakuchiol": 2,
    "mandelic acid": 3,
}

df = pd.read_csv(
    "modified_dataset_v4.csv", converters={"ingredients": ast.literal_eval}
)


def calculate_concerns(ingredients):
    concerns = 0
    for ingredient in ingredients:
        for key, value in ingredient_mapping.items():
            if key in ingredient.lower():
                concerns |= value
                break
    return concerns


df["concerns"] = df["ingredients"].apply(calculate_concerns)

cols = list(df.columns)
concerns_index = cols.index('concerns')
cols.insert(2, cols.pop(concerns_index))  
df = df[cols]

df.to_csv("modified_dataset_v5.csv", index=False)

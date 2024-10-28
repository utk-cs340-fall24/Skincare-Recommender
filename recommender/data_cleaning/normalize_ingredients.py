import pandas as pd
import re

# Comprehensive ingredient mapping 
ingredient_mapping = {
    # Common misspellings
    "fragranc": "parfum",
    "saccha romyces": "saccharomyces",
    
    # Water synonyms
    "aqua": "water",
    "eau": "water",
    
    # Standardized naming
    "ci ": "color index ",
    "cetearyl alcohol": "cetyl stearyl alcohol",
    "ceteareth-": "ceteareth",
    "peg-": "peg",
    "ppg-": "ppg",
    
    # Carbon chain number standardization
    "c12-15": "c12 15",
    "c12-13": "c12 13",
    "c13-14": "c13 14",
    "c14-22": "c14 22",
    "c15-23": "c15 23",
    "c20-40": "c20 40",
    "c10-18": "c10 18",
    "c30-38": "c30 38",
    "c30-45": "c30 45",
    "c50-45": "c50 45",
    "c9-12": "c9 12",
    "c6-14": "c6 14",
    "c5-9": "c5 9",
    "c10-c30": "c10 c30",
    "c10-30": "c10 30",
    
    # Peptide standardization
    "sh-oligopeptide": "sholigopeptide",
    "sh-polypeptide": "shpolypeptide",
    
    # Special character removal
    r"\(": "",
    r"\)": "",
    r"\*": "",
    r"\+": "",
    r"-": " ",
    r"\.": "",
    r"\[": "",
    r"\]": "",
    r"\"": "",
    r"\'": "",
    
    # Space handling
    r"\s+": " ",  # Replace multiple spaces with single space
    
    # Color index standardization
    "color index 77491": "iron oxides",
    "color index 77492": "iron oxides",
    "color index 77499": "iron oxides",
    "color index 77489": "iron oxides",
    "color index ": "color index",
    
    # Common name to scientific name
    "honey": "mel",
    "aloe vera": "aloe barbadensis",
    "chamomile": "chamomilla recutita flower",
    "calendula": "calendula officinalis flower",
    "ylang ylang": "cananga odorata flower",
    
    # Remove marketing terms
    "certified organic cultivation": "",
    "certified organic": "",
    "plant origin": "",
    "natural": "",
    "organic": "",
    
    # Regex patterns for trailing words
    r" extract$": "",
    r" oil$": "",
    r" water$": "",
    r" beeswax$": "beeswax",
    r" leaf$": "leaf",
    r" seed$": "seed",
    r" root$": "root",
    r" flower$": "flower",
    r" fruit$": "fruit",
    
    # Standardized ingredients
    "abies sibirica": "abies sibirica",
    "abronia villosa leaf": "abronia villosa leaf",
    "acacia concinna fruit": "acacia concinna fruit",
    "acacia dealbata flower stem": "acacia dealbata flower stem",
    "c10 30 cholesterol lanosterol esters": "c10 30 cholesterol lanosterol esters",
    "c9 12 alkane coconut": "c9 12 alkane",
    "carica papaya fruit carica papaya papaya fruit": "carica papaya fruit",
    "chamomilla recutita chamomilla recutita flower flower": "chamomilla recutita flower",
    "o cymen 5 ol": "o cymen 5 ol",
    "saccharomyces ferment filtrate": "saccharomyces ferment filtrate",
    
    # Disclaimer removal (using raw string for regex)
    r"disodium edta essential oil please be aware.*ingredients\.": "disodium edta"
}

def normalize_ingredient(ingredient):
    ingredient = ingredient.lower()

    # 1. Perform mapping *before* regex substitutions:
    for k, v in ingredient_mapping.items():
        ingredient = ingredient.replace(k, v)

    # 2. Remove unwanted phrases (after mapping):
    ingredient = re.sub(r"please be aware.*ingredients\.", "", ingredient)
    ingredient = re.sub(r"certified organic cultivation|certified organic|plant origin|natural|organic", "", ingredient)

    # 3. Remove special characters and extra whitespace:
    ingredient = re.sub(r"[*+\.\[\]\"']", "", ingredient)
    ingredient = re.sub(r"[^a-zA-Z0-9]", " ", ingredient)
    ingredient = re.sub(r"\s+", " ", ingredient).strip()

    # 4. Remove redundant words at the end:
    ingredient = re.sub(r"\sextract|\soil|\swater$", "", ingredient)

    # 5. Remove ingredients that are just whitespace or start with a number:
    if ingredient.strip() == "" or ingredient[0].isdigit():  # Check for empty string AFTER stripping
        return ""  # Return empty string to be removed later
    else:
       return ingredient.strip()


def normalize_ingredients_list(x):
    try:
        normalized = [normalize_ingredient(ing) for ing in eval(x)]
        # Remove empty strings from the normalized list
        return [ing for ing in normalized if ing]  # Equivalent to: if ing != ""
    except (SyntaxError, TypeError, NameError):
        print(f"Error processing: {x}")
        return []


def main():
    df = pd.read_csv('modified_dataset_v2.csv')

    df['ingredients'] = df['ingredients'].astype(str)
    df['ingredients'] = df['ingredients'].apply(normalize_ingredients_list)
    df['ingredients'] = df['ingredients'].apply(lambda x: str(x))  # Convert back to string

    df.to_csv('modified_dataset_v3.csv', index=False)




if __name__ == "__main__":
    main()
import pandas as pd

# Load your dataset
data = pd.read_csv("original_data.csv")

# Function to classify product labels
def classify_labels(row):
    # Existing labels as a list
    labels = []

    # Keep existing label unless it's "Treatment" (remove), "Sun protect" (change to SUNSCREEN), "Face Mask" (Change to MASK), or "Eye crem" (Change to EYECREAM)
    if row["Label"] == "Treatment":
        pass
    elif row["Label"] == "Sun protect":
        labels.append("SUNSCREEN")
    elif row["Label"] == "Face Mask":
        labels.append("MASK")
    elif row["Label"] == "Eye cream":
        labels.append("EYECREAM")
    else:
        labels.append(row["Label"].upper())  # Convert to uppercase

    # Check product name for additional labels
    name = row["name"].lower()
    # Cleaner and only be cleansers and exfoliators
    if "CLEANSER" in labels:
        if any(
            term in name
            for term in [
                "exfoliating",
                "peel",
                "aha",
                "bha",
                "salasilyic",
                "glycolic",
                "lactic",
            ]
        ):
            labels.append("EXFOLIATOR")
            return
    else:
        # Other names for moisturizer
        if any(
            term in name
            for term in ["emulsion", "moisturizer", "cream", "lotion", "sleeping mask"]
        ):
            labels.append("MOISTURIZER")
        # Other names for toners
        if "toner" in name:
            # Toners can't be moisturizers or serums
            labels = [
                label for label in labels if label not in ["MOISTURIZER", "SERUM"]
            ]
            labels.append("TONER")
        # Other names for serums
        if any(
            term in name
            for term in [
                "emulsion",
                "serum",
                "solution",
                "essence",
                "concentrate",
                "gel",
                "drops",
            ]
        ):
            # Toners can't be moisturizers or toners
            labels = [
                label for label in labels if label not in ["MOISTURIZER", "TONER"]
            ]
            labels.append("SERUM")
        # Other names for exfoliators
        if any(
            term in name
            for term in [
                "exfoliating",
                "peel",
                "aha",
                "bha",
                "salasilyic",
                "glycolic",
                "lactic",
            ]
        ):
            labels.append("EXFOLIATOR")
        # For eye creams
        if "eye" in name:
            labels.append("EYECREAM")
        # Sleeping masks aren't masks
        if "mask" in name and "sleeping" not in name:
            labels = [
                label
                for label in labels
                if label not in ["MOISTURIZER", "TONER", "SERUM"]
            ]
            labels.append("MASK")
        # Other names for sunscreens
        if "spf" in name or "sun" in name:
            labels.append("SUNSCREEN")

    # Remove duplicates and convert all to uppercase
    labels = list(set(label.upper() for label in labels))
    # If no label added, classific as MISC
    if len(labels) == 0:
        labels = ["MISC"]
    return labels


# Apply the function to each row
data["Label"] = data.apply(classify_labels, axis=1)

# Save the modified dataset to a new CSV file
data.to_csv("modified_dataset_v1.csv", index=False)

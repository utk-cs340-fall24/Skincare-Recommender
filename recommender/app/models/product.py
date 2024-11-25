class Product:
    def __init__(
        self,
        product_id,
        name,
        brand,
        price,
        rating,
        skin_type,
        concerns,
        ingredients,
        category,
    ):
        self.product_id = product_id
        self.name = name
        self.brand = brand
        self.price = price
        self.rating = rating
        self.skin_type = skin_type  # Bitwise representation
        self.concerns = concerns  # Bitwise representation
        self.ingredients = ingredients  # List of ingredient IDs
        self.category = category  # Bitwise representation of the product category

    def is_suitable_for(self, user_skin_type, user_concerns):
        is_skin_type_match = (self.skin_type & user_skin_type) > 0
        is_concerns_match = (self.concerns & user_concerns) > 0
        return is_skin_type_match and is_concerns_match

    def contains_allergy(self, user_allergies):

        return any(ingredient in user_allergies for ingredient in self.ingredients)

    def __str__(self):

        return f"Product({self.product_id}): {self.name}"

    def get_skin_type_label(self):

        skin_type_labels = {1: "Dry", 2: "Normal", 4: "Oily", 8: "Sensitive"}
        skin_types = [
            label for value, label in skin_type_labels.items() if self.skin_type & value
        ]
        return ", ".join(skin_types) if skin_types else "No specific skin type"

    def get_concern_labels(self):
        concern_labels = {
            1: "Acne",
            2: "Aging",
            4: "Dryness",
            8: "Redness",
            16: "Hyperpigmentation",
            32: "Pores",
        }
        concerns = [
            label for value, label in concern_labels.items() if self.concerns & value
        ]
        return ", ".join(concerns) if concerns else "No specific concerns"

    def get_category_label(self):

        category_labels = {
            1: "Cleanser",
            2: "Moisturizer",
            4: "Sunscreen",
            8: "Serum",
            16: "Mask",
            32: "Toner",
            64: "Exfoliator",
            128: "Eye Cream",
        }
        categories = [
            label for value, label in category_labels.items() if self.category & value
        ]
        return ", ".join(categories) if categories else "No specific category"

    def get_product_info(self):
        return {
            "product_id": self.product_id,
            "name": self.name,
            "brand": self.brand,
            "price": self.price,
            "rating": self.rating,
            "skin_type": self.get_skin_type_label(),
            "concerns": self.get_concern_labels(),
            "category": self.get_category_label(),
            "ingredients": self.ingredients,
        }

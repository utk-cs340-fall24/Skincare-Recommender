class User:
    def __init__(
        self,
        id, 
        skin_type,
        concerns,
        allergies,
        prev_product,
    ):
        self.id = id
        self.skin_type = skin_type  # Bitwise representation
        self.concerns = concerns  # Bitwise representation
        self.allergies = allergies  # List of allergy product ids (or ingredient ids)
        self.prev_product = prev_product  # List of previously used product ids

    def get_skin_type(self):
        return self.skin_type

    def get_concerns(self):
        return self.concerns

    def get_allergies(self):
        return self.allergies

    def get_prev_products(self):
        return self.prev_product

    def __str__(self):
        return f"User({self.id}): skin type: {self.get_skin_type()}, concerns: {self.get_concerns()}, allergies: {self.get_allergies()}, prev products: {self.get_prev_products()}"

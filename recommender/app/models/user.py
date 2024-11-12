class User:
    def __init__(
        self,
        uid,
        email,
        display_name,
        skin_type,
        concerns,
        allergies,
        prev_product,
        created_at,
    ):
        self.uid = uid
        self.email = email
        self.display_name = display_name
        self.skin_type = skin_type  # Bitwise representation
        self.concerns = concerns  # Bitwise representation
        self.allergies = allergies  # List of allergy product ids (or ingredient ids)
        self.prev_product = prev_product  # List of previously used product ids
        self.created_at = created_at

    def get_skin_type(self):
        return self.skin_type

    def get_concerns(self):
        return self.concerns

    def get_allergies(self):
        return self.allergies

    def get_prev_products(self):
        return self.prev_product

    def get_user_info(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "display_name": self.display_name,
            "skin_type": self.skin_type,
            "concerns": self.concerns,
            "allergies": self.allergies,
            "prev_products": self.prev_products,
            "created_at": self.created_at,
        }

    def __str__(self):
        return f"User({self.uid}): {self.display_name}"

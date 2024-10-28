# Skin Types
SKIN_TYPES = {
    "DRY": 1 << 0,  # 1 (0b001) - Represents dry skin
    "NORMAL": 1 << 1,  # 2 (0b010) - Represents normal skin
    "OILY": 1 << 2,  # 4 (0b100) - Represents oily skin
    "SENSITIVE": 1 << 3,  # 8 (0b1000) - Represents sensitive skin
}

# Skin Concerns
SKIN_CONCERNS = {
    "ACNE": 1 << 0,  # 1 (0b0001) - Represents acne concern
    "AGING": 1 << 1,  # 2 (0b0010) - Represents aging concern
    "DRYNESS": 1 << 2,  # 4 (0b0100) - Represents dryness concern
    "REDNESS": 1 << 3,  # 8 (0b1000) - Represents redness concern
    "HYPERPIGMENTATION": 1 << 4,  # 16 (0b0001 0000) - Represents hyperpigmentation concern
    "PORES": 1 << 5,  # 32 (0b0010 0000) - Represents large pores concern
}

# Product Categories
PRODUCT_CATEGORIES = {
    "CLEANSER": 1 << 0,  # 1 (0b0001) - Represents cleanser category
    "MOISTURIZER": 1 << 1,  # 2 (0b0010) - Represents moisturizer category
    "SUNSCREEN" : 1 << 2,  # 4 (0b0100) - Represents sunscreen category
    "SERUM": 1 << 3,  # 8 (0b1000) - Represents serum category
    "MASK": 1 << 4,  # 16 (0b0001 0000) - Represents mask category
    "TONER": 1 << 5,  # 32 (0b0010 0000) - Represents toner category
    "EXFOLIATOR": 1 << 6,  # 64 (0b0100 0000) - Represents exfoliator category
    "EYECREAM": 1 << 7,  # 128 (0b1000 0000) - Represents eye cream category
}

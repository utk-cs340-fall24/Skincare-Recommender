// Use bitwise OR (|) to combine multiple skin types and concerns
// Use bitwise AND (&) to check if a user has a specific skin type or concern.

// Skin Types
export const SKIN_TYPES = {
    DRY: 1 << 0,       // 1 (0b001) - Represents dry skin
    OILY: 1 << 1,      // 2 (0b010) - Represents oily skin
    SENSITIVE: 1 << 2, // 4 (0b100) - Represents sensitive skin
};

// Skin Concerns
export const SKIN_CONCERNS = {
    ACNE: 1 << 0,              // 1 (0b0001) - Represents acne concern
    AGING: 1 << 1,             // 2 (0b0010) - Represents aging concern
    DRYNESS: 1 << 2,           // 4 (0b0100) - Represents dryness concern
    REDNESS: 1 << 3,           // 8 (0b1000) - Represents redness concern
    HYPERPIGMENTATION: 1 << 4, // 16 (0b0001 0000) - Represents hyperpigmentation concern
    LARGE_PORES: 1 << 5,       // 32 (0b0010 0000) - Represents large pores concern
};

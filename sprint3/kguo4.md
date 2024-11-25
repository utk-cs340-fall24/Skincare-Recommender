# Sprint 3

**Kevin Guo, kvnguo, Skincare Recommender**

**Planned:** Implement backend routes/controllers for reviews/ingredients, populate the database, and finish data preprocessing.

**Not Done:** Recommender system algorithm development.

**Problems:** Minor database connection/insertion issues, and handling inconsistencies/special characters in ingredient lists.

**Issues:**

- [#67 Reviews and Ingredients Routes and Controllers](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/67)
- [#53 Populate Database with Products, Ingredients, and Reviews](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/53)
- [#32 Preprocess Skincare Data](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/32)

**Files:** 
- /backend/models/Ingredient.js
- /backend/models/User.js
- /backend/models/Product.js
- /backend/controllers/ingredientController.js 
- /backend/controllers/reviewController.js 
- /backend/routes/index.js 
- /backend/routes/ingredientRoutes.js
- /backend/routes/reviewRoutes.js
- /shared/utils/constants.js
- /shared/utils/constants.py
- /recommender/data_cleaning/unique.py
- /recommender/data_cleaning/clean_data.py
- /recommender/data_cleaning/normalize_ingredients.py
- /recommender/data_cleaning/update_labels.py
- /recommender/data_cleaning/add_concerns.py

**Accomplished:** Implemented review/ingredient API endpoints, populated the database with product and ingredient data, and completed data preprocessing (handling missing values/duplicates, normalizing ingredients, categorizing products, and preparing the dataset for recommender system development).

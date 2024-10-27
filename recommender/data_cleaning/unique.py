import csv

def main():
    unique_ingredients = set()

    with open('modified_dataset_v4.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row

        for row in reader:
            try:
                ingredients = eval(row[-1]) # Safely evaluate the ingredient string
                for ingredient in ingredients:
                    unique_ingredients.add(ingredient) # Add each ingredient directly to the set

            except (SyntaxError, NameError): #handle any error when reading the data
                print(f"Error evaluating ingredients: {row[-1]}")

    sorted_unique_ingredients = sorted(list(unique_ingredients))

    with open('unique.txt', 'w', encoding='utf-8') as outfile:
        for ingredient in sorted_unique_ingredients:
            outfile.write(ingredient + '\n')

if __name__ == "__main__":
    main()
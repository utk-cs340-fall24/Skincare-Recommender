# Define a dictionary of skincare products
products = {
    'moisturizer': [
        'Hydrating Moisturizer - Brand 1',
        'Nourishing Cream - Brand 2'
    ],
    'cleanser': [
        'Gentle Foaming Cleanser - Brand 3',
        'Deep Clean Gel - Brand 4'
    ],
    'serum': [
        'Vitamin C Serum - Brand 5',
        'Hyaluronic Acid Serum - Brand 6'
    ]
}

def display_products(category):
    category = category.lower()
    if category in products:
        print("Products in the '{}' category:".format(category))
        for product in products[category]:
            print("- {}".format(product))
    else:
        print("no products found for the category  '{}' :( .".format(category))


def main():
    print("Welcome to the Skincare Products Guide :)")
    print("Available categories: moisturizer, cleanser, serum ")
    
    while True:
        category = raw_input("Enter a category to view products (or type 'exit' to quit): ")
        if category.lower() == 'exit':
            break
        display_products(category)

if __name__ == '__main__':
    main()

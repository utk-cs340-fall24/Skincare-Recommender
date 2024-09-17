import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Mock data
data_list = [
    {
        'name': 'beauty of joseon relief sun: rice + probiotics',
        'ingredients': 'water, oryza sativa (rice) extract, dibutyl adipate, propanediol, diethylamino hydroxybenzoyl hexyl benzoate, polymethylsilsesquioxane, ethylhexyl triazone, niacinamide, methylene bis-benzotriazolyl tetramethylbutylphenol, coco-caprylate/caprate, caprylyl methicone, diethylhexyl butamido triazone, glycerin, butylene glycol, oryza sativa (rice) germ extract, camellia sinensis leaf extract, lactobacillus/pumpkin ferment extract, bacillus/soybean ferment extract, saccharum officinarum (sugarcane) extract, macrocystis pyrifera (kelp) extract, cocos nucifera(coconut) fruit extract, panax ginseng root extract, camellia sinensis leaf extract, monascus/rice ferment, pentylene glycol, behenyl alcohol, poly c10-30 alkyl acrylate, polyglyceryl-3 methylglucose distearate, decyl glucoside, tromethamine, carbomer, acrylates/c10-30 alkyl acrylate crosspolymer, 1,2-hexanediol, sodium stearoyl glutamate, polyacrylate crosspolymer-6, ethylhexylglycerin, adenosine, xanthan gum, tocopherol, lactobacillus/rice ferment, aspergillus ferment, saccharomyces/rice ferment filtrate extract'
    },
    {
        'name': 'round lab birch juice moisturizing sunscreen',
        'ingredients': 'water, dibutyl adipate, propanediol, diethylamino hydroxybenzoyl hexyl benzoate, polymethylsilsesquioxane, ethylhexyl triazone, niacinamide, methylene bis-benzotriazolyl tetramethylbutylphenol, cocoa-caprylate/caprate, caprylyl methicone, diethylhexyl butamido triazone, glycerin, 1,2-hexanediol, butylene glycol, birch sap (1,425ppm), sodium hyaluronate, hyaluronic acid, glyceryl glucoside, dipotassium glycyrrhizate, allantoin, portulaca oleracea extract, artemisia annua extract, pinus sylvestris leaf extract, anthemis nobilis (chamomile) flower oil, acrylate/c10-30 alkyl acrylate crosspolymer, sodium stearoyl glutamate, polyacrylate crosspolymer-6, ethylhexylglycerin, ascorbic acid, adenosine, pentylene glycol, behenyl alcohol, poly c10-30 alkyl acrylate, polyglyceryl-3 methylglucose distearate, decyl glucoside, tromethamine, xanthan gum, t-butyl alcohol, tocopherol, carbomer'
    },
    {
        'name': 'goodal heartleaf calming moisture sun cream',
        'ingredients': 'water, dibutyl adipate, propanediol, polymethylsilsesquioxane, diisopropyl sebacate, diethylamino hydroxybenzoyl hexyl benzoate, ethylhexyl triazone, methylene bis-benzotriazolyl tetramethylbutylphenol, coco-caprylate/caprate, diethylhexyl butamido triazone, butylene glycol, glycerin, 1,2-hexanediol, caprylyl methicone, houttuynia cordata extract, pentylene glycol, behenyl alcohol, poly c10-30 alkyl acrylate, polyglyceryl-3 methylglucose distearate, decyl glucoside, tromethamine, carbomer, acrylates/c10-30 alkyl acrylate crosspolymer, sodium stearoyl glutamate, polyacrylate crosspolymer-6, ethylhexylglycerin, xanthan gum, t-butyl alcohol, tocopherol'
    },
    {
        'name': 'makeprem uv defense me no sebum sun cream',
        'ingredients': 'water,zinc oxide,cyclohexasiloxane,butyloctyl salicylate,propanediol,propylheptyl caprylate,isododecane,caprylyl methicone,polyglyceryl-3 polydimethylsiloxyethyl dimethicone,methyl methacrylate crosspolymer,methyl trimethicone,pelargonium graveolens extract,oenothera biennis (evening primrose) flower extract, ulmus davidiana root extract,pinus palustris leaf extract,pueraria lobata root extract,bacillus/soybean ferment extract,juniperus virginiana oil,litsea cubeba fruit oil,sodium hyaluronate,vetiveria zizanoides root oil,elettaria cardamomum seed oil,nymphaea caerulea flower water,disteardimonium hectorite,magnesium sulfate,triethoxycaprylylsilane,1,2-hexanediol,polyglyceryl-2 dipolyhydroxystearate, polymethylsilsesquioxane,lauryl polyglyceryl-3 polydimethylsiloxyethyl dimethicone,glyceryl caprylate,caprylyl glycol,ethylhexylglycerin,tocopherol,butylene glycol,folic acid'
    }
]

# Mock input
input_product = {
    'name': 'skin1004 madagascar centella hyalu-cica water-fit sun serum',
    'ingredients': 'water, dibutyl adipate, propanediol, diethylamino hydroxybenzoyl hexyl benzoate, polymethylsilsesquioxane, ethylhexyl triazone, methylene bis-benzotriazolyl tetramethylbutylphenol, niacinamide, coco-caprylate/caprate, caprylyl methicone, diethylhexyl butamido triazone, glycerin, 1,2-hexanediol, butylene glycol, centella asiatica extract (9800ppm), betula platyphylla japonica bark extract, ginkgo biloba leaf extract, camellia sinensis leaf extract, triticum vulgare (wheat) sprout extract, medicago sativa (alfalfa) extract, brassica oleracea italica (broccoli) sprout extract, eruca sativa leaf extract, camellia japonica leaf extract, sodium hyaluronate (10ppm), behenyl alcohol, poly c10-30 alkyl acrylate, polyglyceryl-3 methylglucose distearate, decyl glucoside, tromethamine, carbomer, acrylates/c10-30 alkyl acrylate crosspolymer, sodium stearoyl glutamate, polyacrylate crosspolymer-6, adenosine, xanthan gum, t-butyl alcohol, tocopherol, hydrolyzed hyaluronic acid (1ppm), inositol, hyaluronic acid (0.01ppm), pentylene glycol, ethylhexylglycerin'
}

# Convert data to DataFrames
df = pd.DataFrame(data_list)
input_df = pd.DataFrame([input_product])

# Add the input product to the original DataFrame
df = pd.concat([df, input_df], ignore_index=True)

# Vectorize the ingredient lists
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['ingredients'])

# Compute cosine similarity between the input product and other products
input_vector = X[-1]  # Input vector
other_vectors = X[:-1]  # Vectors for other products
cosine_similarities = cosine_similarity(input_vector, other_vectors)

# Create a DataFrame to display the results
results = pd.DataFrame({
    'Product': df['name'][:-1],
    'Similarity Score': cosine_similarities.flatten()
})

print(f'Input Product: {df.iloc[-1]['name']}\n')
print(results.round(2))

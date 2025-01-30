import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forktastic';
const client = new MongoClient(uri);

export const seedRecipes = async () => {
  try {
    await client.connect();
    const database = client.db('forktastic'); // Replace with your database name
    const recipesCollection = database.collection('recipes'); 

    const recipes = [
      {
        title: "Rosemary and Red Onion Focaccia",
        summary: "Rosemary and Red Onion Focaccia is a bread that serves 16. One portion of this dish contains approximately <b>3g of protein</b>, <b>3g of fat</b>, and a total of <b>141 calories</b>. For <b>16 cents per serving</b>, this recipe <b>covers 5%</b> of your daily requirements of vitamins and minerals. It is a <b>very reasonably priced</b> recipe for fans of Mediterranean food. 1 person were impressed by this recipe. It is brought to you by Foodista. If you have lemon zest, rosemary, olive oil, and a few other ingredients on hand, you can make it. It is a good option if you're following a <b>dairy free and lacto ovo vegetarian</b> diet. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. With a spoonacular <b>score of 49%</b>, this dish is good. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-80012\">Rosemary And Red Onion Focaccia</a>, <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-551751\">Rosemary and Red Onion Focaccia</a>, and <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-506954\">Rosemary and Red Onion Focaccia</a>.",
        readyInMinutes: 45,
        servings: 16,
        ingredients: [
          "3 tablespoons olive oil+ extra for bowl and pans",
          "1 cup cold water",
          "1/4 cup lukewarm water",
          "1 teaspoon salt",
          "2 tablespoons fresh chopped rosemary",
          "3 tablespoons chopped red onion (or shallot)+ extra slices for top",
          "4 cups all-purpose flour",
          "Salt and Pepper",
          "1 package of dry active yeast",
          "1 teaspoon honey",
          "1 Zest of lemon",
        ],
        instructions:
          "Pour the warm water and honey into the bowl of your electric mixer with a paddle attachment. Add one package of dry active yeast and swirl around. Allow the yeast to foam for 10 minutes or so. Then add the cold water, lemon zest, 2 Tb. oil, salt, rosemary and onions. Turn the mixer on low and slowly add the flour. Once all the flour is in the bowl, switch the paddle to the bread hook attachment. Knead on low for about 10 minutes.\nPull the dough away from the sides and rub the bowl down with oil. Cover the bowl with plastic wrap and allow the dough to rise for 1  to 2 hours. Remove the plastic wrap and turn the mixer back on for 30 seconds.\nDivide the dough into two pieces and press with your fingers into two 9-10 inch round pans. As you press to dough to the edges, dont be afraid to let your fingers puncture the doughthis will created the bumpy, rustic texture of traditional focaccia.\nCover both pans with a clean, damp towel. Allow the dough to rise again for another 2 hours. Preheat the oven to 400* F. Before baking use the remaining tablespoon of oil and brush the tops of the loaves. Sprinkle with salt and pepper and decorate with thin onion slices, if you like.\nBake for 25-30 minutes, until the tops are golden-brown. Turn out the bread loaves and ENJOY!",
        steps: [
          "Pour the warm water and honey into the bowl of your electric mixer with a paddle attachment.",
          "Add one package of dry active yeast and swirl around. Allow the yeast to foam for 10 minutes or so. Then add the cold water, lemon zest, 2 Tb. oil, salt, rosemary and onions. Turn the mixer on low and slowly add the flour. Once all the flour is in the bowl, switch the paddle to the bread hook attachment. Knead on low for about 10 minutes.",
          "Pull the dough away from the sides and rub the bowl down with oil. Cover the bowl with plastic wrap and allow the dough to rise for 1  to 2 hours.",
          "Divide the dough into two pieces and press with your fingers into two 9-10 inch round pans. As you press to dough to the edges, dont be afraid to let your fingers puncture the doughthis will created the bumpy, rustic texture of traditional focaccia.",
          "Cover both pans with a clean, damp towel. Allow the dough to rise again for another 2 hours. Preheat the oven to 400* F. Before baking use the remaining tablespoon of oil and brush the tops of the loaves.",
          "Sprinkle with salt and pepper and decorate with thin onion slices, if you like.",
          "Bake for 25-30 minutes, until the tops are golden-brown. Turn out the bread loaves and ENJOY!",
        ],
        diets: ["dairy free", "lacto ovo vegetarian"],
        image: "https://img.spoonacular.com/recipes/658782-556x370.jpg",
        sourceUrl:
          "https://www.foodista.com/recipe/8PZLGG3C/rosemary-and-red-onion-focaccia",
        spoonacularSourceUrl:
          "https://spoonacular.com/rosemary-and-red-onion-focaccia-658782",
        spoonacularId: 658782,
      },
        {
          title: "Italian Steamed Artichokes",
          summary: "Forget going out to eat or ordering takeout every time you crave Mediterranean food. Try making Italian Steamed Artichokes at home. This gluten free, dairy free, paleolithic, and lacto ovo vegetarian recipe serves 1 and costs <b>$3.76 per serving</b>. One portion of this dish contains approximately <b>15g of protein</b>, <b>1g of fat</b>, and a total of <b>221 calories</b>. Head to the store and pick up artichoke, basil, coriander seeds, and a few other things to make it today. This recipe from Foodista has 1 fans. It works best as a main course, and is done in around <b>35 minutes</b>. Overall, this recipe earns an <b>amazing spoonacular score of 92%</b>. Similar recipes include <a href=\"https://spoonacular.com/recipes/steamed-artichokes-109075\">Steamed Artichokes</a>, <a href=\"https://spoonacular.com/recipes/steamed-artichokes-108661\">Steamed Artichokes</a>, and <a href=\"https://spoonacular.com/recipes/steamed-artichokes-28452\">Steamed Artichokes</a>.",
          readyInMinutes: 35,
          servings: 1,
          ingredients: [
            "1 large artichoke (1 pound)",
            "1 Bay Leaf",
            "1/4 tsp coriander seeds",
            "1/2 tsp dried basil",
            "1 Garlic Clove, sliced thin",
            "1/2 tsp dried oregano"
          ],
          instructions: "<ol><li>Snip the thorns off the artichoke leaves. Place the garlic slices inside the leaves throughout the artichoke. Put the artichoke into a medium-size saucepan. Add water to come halfway up the artichoke.</li><li>Put the bay leaf in the water.</li><li>Crush the coriander seeds, oregano and basil together; sprinkle on top of the artichoke.</li><li>Cook over medium heat for 30 minutes, or until the leaves pull off easily.</li></ol>",
          steps: [
            "Snip the thorns off the artichoke leaves.",
            "Place the garlic slices inside the leaves throughout the artichoke.",
            "Put the artichoke into a medium-size saucepan.",
            "Add water to come halfway up the artichoke.",
            "Put the bay leaf in the water.",
            "Crush the coriander seeds, oregano and basil together; sprinkle on top of the artichoke.",
            "Cook over medium heat for 30 minutes, or until the leaves pull off easily."
          ],
          diets: [
            "gluten free",
            "dairy free",
            "paleolithic",
            "lacto ovo vegetarian",
            "primal",
            "whole 30",
            "vegan"
          ],
          image: "https://img.spoonacular.com/recipes/648257-556x370.jpg",
          sourceUrl: "http://www.foodista.com/recipe/J5VBFYJB/italian-steamed-artichokes",
          spoonacularSourceUrl: "https://spoonacular.com/italian-steamed-artichokes-648257",
          spoonacularId: 648257
        },
        {
          title: "Kale Bruschetta",
          summary: "Kale Bruschettan is a <b>dairy free, lacto ovo vegetarian, and vegan</b> recipe with 1 servings. For <b>26 cents per serving</b>, this recipe <b>covers 2%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains around <b>0g of protein</b>, <b>14g of fat</b>, and a total of <b>132 calories</b>. This recipe from Foodista requires bread, extra virgin olive oil, garlic clove, and sea salt. It works best as a hor d'oeuvre, and is done in roughly <b>45 minutes</b>. This recipe is typical of Mediterranean cuisine. Only a few people made this recipe, and 1 would say it hit the spot. Overall, this recipe earns a <b>not so tremendous spoonacular score of 28%</b>. Try <a href=\"https://spoonacular.com/recipes/kale-bruschetta-1569707\">Kale Bruschetta</a>, <a href=\"https://spoonacular.com/recipes/kale-and-bean-bruschetta-14995\">Kale And Bean Bruschetta</a>, and <a href=\"https://spoonacular.com/recipes/kale-and-bean-bruschetta-14998\">Kale and Bean Bruschetta</a> for similar recipes.",
          readyInMinutes: 45,
          servings: 1,
          ingredients: [
            "Country-style bread, sliced for toast, thickly",
            "extra virgin olive oil",
            "1 Garlic Clove",
            "inch Kale, called cavolo nero tuscany",
            "Sea Salt"
          ],
          instructions: "<ol><li>Clean kale, by removing the tough stems.</li><li>Wash off and boil in salted water until tender</li><li>Drain well</li><li>Chop</li><li>Saute in olive oil with sliced garlic</li><li>Toast bread</li><li>Rub with raw garlic clove</li><li>Top with hot kale</li><li>Sprinkle with salt</li><li>Drizzle with Extra Virgin Olive Oil</li></ol>",
          steps: [
            "Clean kale, by removing the tough stems.Wash off and boil in salted water until tender",
            "Drain well",
            "Chop",
            "Saute in olive oil with sliced garlic",
            "Toast bread",
            "Rub with raw garlic clove",
            "Top with hot kale",
            "Sprinkle with salt",
            "Drizzle with Extra Virgin Olive Oil"
          ],
          diets: [
            "dairy free",
            "lacto ovo vegetarian",
            "vegan"
          ],
          image: "https://img.spoonacular.com/recipes/648715-556x370.jpg",
          sourceUrl: "https://spoonacular.com/kale-bruschetta-648715",
          spoonacularSourceUrl: "http://www.foodista.com/recipe/3MK8JYZR/kale-bruschetta",
          spoonacularId: 648715
        }      
    ];

    await recipesCollection.insertMany(recipes);
    console.log('Seed data successfully inserted!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
};

seedRecipes();

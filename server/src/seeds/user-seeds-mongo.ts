import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forktastic';
const client = new MongoClient(uri);

export const seedUsers = async () => {
  try {
    await client.connect();
    const database = client.db('forktastic'); // Replace with your database name
    const usersCollection = database.collection('users');

    const users = [
      {
        userName: "Paul",
        userEmail: "paul@gmail.com",
        userPassword: "1234",
        intolerances: ["dairy"],
        diet: "vegetarian",
        favIngredients: ["kale"],
        savedRecipes: ["6796c3cdf5e4bd321c6db924"] 
      },
      {
        userName: "Joe",
        userEmail: "joe@gmail.com",
        userPassword: "1234",
        intolerances: ["dairy"],
        diet: "vegetarian",
        favIngredients: ["rosemary"],
        savedRecipes: ["6796cc8efae9342661ddfd2a"] 
      },
      {
        userName: "Jessica",
        userEmail: "jessica@gmail.com",
        userPassword: "1234",
        intolerances: ["dairy"],
        diet: "vegetarian",
        favIngredients: ["garlic"],
        savedRecipes: ["6796d2458a9aa318aa6e81bc"] 
      },
      {
        userName: "Jennifer",
        userEmail: "jennifer@gmail.com",
        userPassword: "1234",
        intolerances: ["dairy"],
        diet: "vegetarian",
        favIngredients: ["onion"],
        savedRecipes: ["6796d3c7ec68122d80fef213"] 
      }
    ];

    const result = await usersCollection.insertMany(users);
    console.log(`${result.insertedCount} users inserted successfully`);
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await client.close();
  }
};

seedUsers();

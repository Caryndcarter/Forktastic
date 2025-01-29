import { User, Recipe, Review } from "../models_mongo/index.js";
import { signToken, AuthenticationError } from "../middleware/auth_graphQL.js";
import { GraphQLError } from "graphql";
import { recipe } from "../types/index.js";
//import { ReviewDocument } from "../models_mongo/review.js";
import { diet, intolerance, user_context } from "../types/index.js";
import mongoose from "mongoose";

const resolvers = {
  Query: {
    getUser: async (_: any, _args: any, context: any): Promise<any> => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("could not authenticate user.");
    },

    getSpecificRecipeId: async (
      _: any,
      { recipeId }: { recipeId: string },
      context: any
    ): Promise<string | null> => {
      console.log("Received recipeId:", recipeId);
      console.log("Context user:", context.user);

      if (!context.user) {
        throw new AuthenticationError("User not authenticated.");
      }

      try {
        // Convert recipeId string to ObjectId
        //const objectId = new mongoose.Types.ObjectId(recipeId);

        // Find the user by their ID
        const user = await User.findOne({ _id: context.user._id });

        if (!user) {
          throw new GraphQLError("User not found.");
        }

        const savedRecipes = user.savedRecipes || [];

        // Check if the provided recipeId exists in savedRecipes
        const foundRecipe = savedRecipes.find(
          (id) => id.toString() === recipeId
        );

        // Return the recipeId if found, otherwise return null
        return foundRecipe ? foundRecipe.toString() : null;
      } catch (err) {
        console.error("Error in get specific recipe resolver:", err);
        throw new GraphQLError("Failed to check if the recipe is saved.");
      }
    },

    getRecipes: async (
      _parent: any,
      _args: any,
      context: user_context
    ): Promise<recipe[] | null> => {
      if (!context.user) {
        throw new AuthenticationError("could not authenticate user.");
      }

      const user = await User.findOne({ _id: context.user._id });

      if (!user) {
        throw new AuthenticationError("could not find user.");
      }

      const savedRecipes = user.savedRecipes;

      if (!savedRecipes) {
        console.log(`no recipes found for ${user.userName}`);
        return null;
      } else if (savedRecipes.length == 0) {
        console.log(`no recipes found for ${user.userName}`);
        return null;
      }
      let recipes: recipe[] = [];

      for (const id of savedRecipes) {
        const recipe: recipe | null = await Recipe.findById(id);
        if (!recipe) {
          console.log("skipping...");
          continue;
        }
        recipes.push(recipe);
      }

      return recipes;
    },

    getRecipe: async (
      _parent: any,
      args: {
        mongoID: mongoose.Schema.Types.ObjectId;
        spoonacularId: number;
      },
      context: user_context
    ): Promise<recipe | null> => {
      if (!context.user) {
        throw new AuthenticationError("could not authenticate user.");
      }

      const user = await User.findOne({ _id: context.user._id });

      if (!user) {
        throw new AuthenticationError("could not find user.");
      }

      const { mongoID, spoonacularId } = args;

      console.log(mongoID, spoonacularId);

      let recipe: recipe | null = null;

      if (mongoID) {
        recipe = await Recipe.findById(mongoID);
      } else if (spoonacularId) {
        recipe = await Recipe.findOne({ spoonacularId: spoonacularId });
      }

      return recipe;
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back
    signUp: async (
      _parent: any,
      {
        userName,
        userEmail,
        userPassword,
      }: { userName: string; userEmail: string; userPassword: string }
    ) => {
      const user = await User.create({ userName, userEmail, userPassword });

      if (!user) {
        throw new GraphQLError("Something is Wrong! Creating user failed");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      console.log(`User ${user.userName} sucessfully signed up`);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    login: async (
      _: any,
      args: { userEmail: string; userPassword: string }
    ): Promise<any> => {
      const { userEmail, userPassword } = args;
      console.log(userEmail);
      const user = await User.findOne({ userEmail: userEmail });

      if (!user) {
        throw new GraphQLError("Wrong email");
      }

      const correctPw = await user.isCorrectPassword(userPassword);
      if (!correctPw) {
        throw new GraphQLError("Wrong password");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      return { token, user };
    },

    // update the preferences of a user
    updatePreferences: async (
      _: any,
      args: {
        diet?: diet;
        intolerances?: intolerance[];
      },
      context: user_context
    ): Promise<any> => {
      if (!context.user) {
        throw new AuthenticationError("could not authenticate user.");
      }

      const user = await User.findOne({ _id: context.user._id });

      if (!user) {
        throw new AuthenticationError("could not find user.");
      }

      const { diet, intolerances } = args;

      if (diet) {
        user.diet = diet;
      }

      if (intolerances) {
        user.intolerances = intolerances;
      }

      await user.save();
      console.log(`${user.userName}'s new preferences are saved`);
      return {
        id: user._id,
        diet: user.diet || null,
        intolerances: user.intolerances || [],
      };
    },

    //Save a recipe to the overall recipe collection
    addRecipe: async (
      _parent: any,
      {
        recipeInput,
      }: {
        recipeInput: {
          title: string;
          summary: string;
          readyInMinutes: number;
          servings: number;
          ingredients: string[];
          instructions: string;
          steps: string[];
          diet?: string[];
          image?: string;
          sourceUrl?: string;
          spoonacularId?: number;
          spoonacularSourceUrl?: string;
        };
      }
    ) => {
      try {
        const { spoonacularId } = recipeInput;

        // check for duplicates by the spoonacular ID
        let duplicate: recipe | null = null;

        if (spoonacularId) {
          duplicate = await Recipe.findOne({
            spoonacularId: spoonacularId,
          }).exec();
        }

        if (duplicate) {
          console.log("duplicate found.");
          return duplicate;
        }

        // Create and save the new recipe
        const newRecipe = await Recipe.create(recipeInput);

        if (!newRecipe) {
          throw new GraphQLError("Error saving recipe to collection.");
        }

        return newRecipe;
      } catch (err) {
        console.error("Error saving recipe to collection:", err);
        throw new GraphQLError("Error saving recipe to collection.");
      }
    },

    // save a recipe to a user's `savedRecipes` field by adding it to the set (to prevent duplicates)
    saveRecipe: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      if (!context.user) {
        console.log("No user in context:", context.user);
        throw new GraphQLError("You must be logged in");
      }

      try {
        console.log("Attempting to update user with recipe:", recipeId);

        // Check if the recipe exists in the Recipe collection
        const existingRecipe = await Recipe.findById(recipeId);

        if (!existingRecipe) {
          throw new GraphQLError("Recipe not found");
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: recipeId } },
          { new: true, runValidators: true }
        );

        console.log("Updated user:", updatedUser);

        if (!updatedUser) {
          console.log("User not found or update failed.");
          throw new GraphQLError(
            "Error saving recipe: User not found or update failed."
          );
        }

        return updatedUser;
      } catch (err) {
        console.log("Error saving recipe:", err);
        throw new GraphQLError("Error saving recipe.");
      }
    },

    // remove a recipe from a user's `savedRecipes`
    removeRecipe: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      console.log("Attempting to remove recipe:", recipeId);

      if (!context.user) {
        throw new GraphQLError("You must be logged in!");
      }

      // Convert recipeId to ObjectId to ensure correct matching
      const objectId = new mongoose.Types.ObjectId(recipeId);
      console.log("Converted to ObjectId:", objectId);

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedRecipes: objectId } },
          { new: true, runValidators: true }
        );

        console.log("Saved recipes after:", updatedUser?.savedRecipes);

        if (!updatedUser) {
          throw new GraphQLError("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (err) {
        console.log("Error removing recipe:", err);
        throw new GraphQLError("Error removing recipe.");
      }
    },

     // Add a review to the overall collection
     addReview: async (
      _parent: any,
      {
        userId,
        recipeId,
        rating,
        comment,
      }: {
        userId: string;
        recipeId: string;
        rating: number;
        comment: string;
      }
    ) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new GraphQLError("User not found.");
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
          throw new GraphQLError("Recipe not found.");
        }

        const newReview = new Review({
          userId,
          recipeId,
          rating,
          comment,
          userName: user.userName, 
        });

        // // Save the review to the database
        // const savedReview: ReviewDocument = await newReview.save();

        // // Add the review to the user's reviews array
        // user.reviews?.push(savedReview._id.toString());
        // await user.save();

        // // Add the review to the recipe's reviews array
        // recipe.reviews?.push(savedReview._id);
        // await recipe.save();

        // Return the saved review object
        return newReview;
      } catch (err) {
        console.error("Error saving review to collection:", err);
        throw new GraphQLError("Error saving review to collection.");
      }
    },
  },
};

export default resolvers;

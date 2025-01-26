import User from "../models_mongo/user.js";
import Recipe from "../models_mongo/recipe.js"
import { signToken, AuthenticationError } from "../middleware/auth_graphQL.js";
import { GraphQLError } from "graphql";
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

    isRecipeSaved: async (_: any, { recipeId }: { recipeId: string }, context: any): Promise<boolean> => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated.");
      }

      try {

         // Convert recipeId string to ObjectId
        const objectId = new mongoose.Types.ObjectId(recipeId);

        // Find the user by their ID
        const user = await User.findOne({ _id: context.user._id });

        if (!user) {
          throw new GraphQLError("User not found.");
        }


        // Check if the recipeId exists in the savedRecipes array
        const isSaved = user.savedRecipes.includes(objectId);
        return isSaved;
      } catch (err) {
        console.error("Error in isRecipeSaved resolver:", err);
        throw new GraphQLError("Failed to check if the recipe is saved.");
      }
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
     saveRecipe: async ( _parent: any,{ recipe }: { recipe: { recipeId: string;} }, context: any) => {

      if (!context.user) {
        console.log('No user in context:', context.user);
        throw new GraphQLError('You must be logged in');
      }

      try {

        // console.log('Attempting to update user with recipe:', recipe);

        // Check if the recipe exists in the Recipe collection
        const existingRecipe = await Recipe.findById(recipe.recipeId);

        if (!existingRecipe) {
          throw new GraphQLError("Recipe not found");
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: recipe } },
          { new: true, runValidators: true }
        );

        // console.log('Updated user:', updatedUser);

        if (!updatedUser) {
          console.log('User not found or update failed.');
          throw new GraphQLError('Error saving recipe: User not found or update failed.');
        }

        return updatedUser;
      } catch (err) {
        console.log('Error saving recipe:', err);
        throw new GraphQLError('Error saving recipe.');
      }
    },

    // remove a recipe from a user's `savedRecipes`
    removeRecipe: async ( _parent: any, { recipeId }: { recipeId: string }, context: any) => {
      
      if (!context.user) {
        throw new GraphQLError('You must be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedRecipes: { recipeId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new GraphQLError("Couldn't find user with this id!");
      }

      return updatedUser;
    },
  },
};

export default resolvers;

import { Schema, model, type Document } from "mongoose";
//import { diet, dietValues } from "../types/diet.js";

export interface RecipeDocument extends Document {
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
  reviews?: string[];
}

const recipeSchema = new Schema<RecipeDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
      default: [],
    },
    instructions: {
      type: String,
      required: true,
    },
    steps: {
      type: [String],
      required: true,
      default: [],
    },
    diet: {
      type: [String],
      //enum: dietValues,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    sourceUrl: {
      type: String,
      required: false,
      default: null,
    },
    spoonacularId: {
      type: Number,
      required: false,
      default: null,
    },
    spoonacularSourceUrl: {
      type: String,
      required: false,
      default: null,
    },
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
      required: false,
      default: [],
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Recipe = model<RecipeDocument>("Recipe", recipeSchema);

export default Recipe;

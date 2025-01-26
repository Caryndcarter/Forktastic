import bcrypt from "bcrypt";
import mongoose, { Schema, model, type Document } from "mongoose";
import { diet, dietValues } from "../types/diet.js";
import { intolerance, intoleranceValues } from "../types/intolerance.js";

export interface UserDocument extends Document {
  userName: string;
  userEmail: string;
  userPassword: string;
  savedRecipes?: mongoose.Types.ObjectId[];
  diet?: diet;
  intolerances?: intolerance[];
  reviews?: string[]; 
  isCorrectPassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    userName: {
      type: String,
      required: true,
      unique: false,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    userPassword: {
      type: String,
      required: true,
    },
    savedRecipes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
      required: false,
      default: [],
    },
    diet: {
      type: String,
      enum: dietValues,
      required: false,
      default: null,
    },
    intolerances: {
      type: [String],
      enum: intoleranceValues,
      required: false,
      default: [],
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

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.userPassword);
};

const User = model<UserDocument>("User", userSchema);

export default User;

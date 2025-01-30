import { Schema, model, type Document }  from "mongoose";


export interface ReviewDocument extends Document {
    userId: Schema.Types.ObjectId;
    recipeId: Schema.Types.ObjectId;
    comment: string,
    rating: number,
    userName: string
}

const reviewSchema = new Schema<ReviewDocument>(
    {
        userId: {
          type: Schema.Types.ObjectId, ref: "User",
          required: true,
        },
        recipeId: {
          type: Schema.Types.ObjectId,ref: "Recipe",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        userName: {
            type: String, 
            required: true
        },
    },
  
    {
      toJSON: {
        virtuals: true,
      },
    }
  );
  
      

const Review = model<ReviewDocument>("Review", reviewSchema);

export default Review;


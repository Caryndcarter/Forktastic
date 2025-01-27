import { Schema, model, type Document } from "mongoose";

interface ReviewDocument extends Document {
    review: string,
    rating: number,
    userName: string
}

const reviewSchema = new Schema<ReviewDocument>(
    {
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        _id: false
    }
);

const Review = model<ReviewDocument>("Review", reviewSchema);

export default Review;


import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_REVIEW, SAVE_REVIEW_TO_USER, SAVE_REVIEW_TO_RECIPE } from "../utils_graphQL/mutations"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { currentRecipeContext } from "@/App"
import { useContext} from "react";

interface ReviewProps {
  recipeId: string | undefined
  existingReview: ReviewData | null
  onReviewSubmit: () => void
}

interface ReviewData {
  rating: number
  comment: string
}

export function Review({ existingReview, onReviewSubmit }: ReviewProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [comment, setComment] = useState(existingReview?.comment || "")
  const { currentRecipeDetails } = useContext(currentRecipeContext);


  const [addReview] = useMutation(ADD_REVIEW)
  //const [updateReview] = useMutation(UPDATE_REVIEW)
  const [saveReviewToUser] = useMutation(SAVE_REVIEW_TO_USER)
  const [saveReviewToRecipe] = useMutation(SAVE_REVIEW_TO_RECIPE)
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   
    try {
      if (existingReview) {
        console.log("There is an existing Review");
       
      } else {

        const recipeId = currentRecipeDetails._id
        const reviewInput = {recipeId, rating, comment }

        console.log("new review: " , reviewInput)
        console.log("recipeId: " , recipeId);
        // Save the review to the review collection
        const { data } = await addReview({ 
          variables: { 
            reviewInput 
          },
         },
        )
            // Save the review ID to the user's reviews array
          if (data?.addReview._id) {
            await saveReviewToUser({
              variables: {
                reviewId: data.addReview._id,
              },
            });
          }   
          
           // Save the review ID to the recipe's reviews array
           if (data?.addReview._id) {
            await saveReviewToRecipe({
              variables: {
                recipeId,
                reviewId: data.addReview._id,
              },
            });
          }      
      }
      onReviewSubmit()
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            aria-label={`Rate ${star} stars`}
            
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        className="w-full p-2 border rounded"
      />
      <Button type="submit" className="w-full bg-[#a84e24]">
        {existingReview ? "Update Review" : "Submit Review"}
      </Button>
    </form>
  )
}


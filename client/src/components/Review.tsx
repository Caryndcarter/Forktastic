import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_REVIEW } from "../utils_graphQL/mutations"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ReviewProps {
  recipeId: string | undefined
  userId: string | undefined
  existingReview: ReviewData | null
  onReviewSubmit: () => void
}

interface ReviewData {
  rating: number
  comment: string
}

export function Review({ recipeId, userId, existingReview, onReviewSubmit }: ReviewProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [comment, setComment] = useState(existingReview?.comment || "")

  const [addReview] = useMutation(ADD_REVIEW)
  //const [updateReview] = useMutation(UPDATE_REVIEW)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const reviewInput = { userId, recipeId, rating, comment }
    try {
      if (existingReview) {
        //await updateReview({ variables: { reviewInput } })
        console.log("no existing review: " , reviewInput)
      } else {
        await addReview({ variables: { reviewInput } })
        console.log(reviewInput)
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
      <Button type="submit" className="w-full">
        {existingReview ? "Update Review" : "Submit Review"}
      </Button>
    </form>
  )
}


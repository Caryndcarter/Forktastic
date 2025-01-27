import { Star } from "lucide-react"

interface AverageReviewProps {
  averageRating: number
  totalReviews: number
}

export default function AverageReview({ averageRating, totalReviews }: AverageReviewProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={star <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
      <span className="text-gray-500">
        ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
      </span>
    </div>
  )
}

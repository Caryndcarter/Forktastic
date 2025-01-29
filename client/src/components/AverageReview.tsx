import type React from "react"

interface AverageReviewProps {
  averageRating: number
  totalReviews: number
}

const AverageReview: React.FC<AverageReviewProps> = ({ averageRating, totalReviews }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex mr-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
      <span className="text-gray-600 ml-2">
        ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
      </span>
    </div>
  )
}

export default AverageReview


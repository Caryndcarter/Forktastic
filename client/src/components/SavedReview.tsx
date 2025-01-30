import { Star } from "lucide-react"

interface SavedReviewProps {
  rating: number
  comment: string
}

export default function SavedReview({ rating, comment }: SavedReviewProps) {
  return (
    <div className="space-y-4 w-full max-w-md border p-4 rounded-md">
      <div>
        <h3 className="font-semibold mb-2">Your Review</h3>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  )
}

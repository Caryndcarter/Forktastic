import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ReviewComponentProps {
  onSubmit: (rating: number, comment: string) => void
  initialReview: { rating: number; comment: string } | null
}

export default function ReviewComponent({ onSubmit, initialReview }: ReviewComponentProps) {
  const [rating, setRating] = useState<number>(initialReview?.rating || 0)
  const [comment, setComment] = useState<string>(initialReview?.comment || "")

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating)
      setComment(initialReview.comment)
    }
  }, [initialReview])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(rating, comment)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="rating">Rating</Label>
        <div className="flex space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              type="button"
              variant="ghost"
              size="sm"
              className={cn("p-0 h-auto", star <= rating ? "text-yellow-400" : "text-gray-300")}
              onClick={() => setRating(star)}
            >
              <Star className="h-6 w-6 fill-current" />
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2"
        />
      </div>
      <Button type="submit" disabled={rating === 0}>
        {initialReview ? "Update Review" : "Submit Review"}
      </Button>
    </form>
  )
}


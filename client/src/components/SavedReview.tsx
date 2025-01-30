import { Star } from "lucide-react";
import { useState, useContext, useLayoutEffect } from "react";
import { useQuery } from "@apollo/client";
import { currentRecipeContext } from "@/App";
import { GET_REVIEWS } from "@/utils_graphQL/queries";
import Auth from "../utils_graphQL/auth";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
}

interface SavedReviewProps {
  recipeId: string | null;
}

export default function SavedReview({ recipeId }: SavedReviewProps) {
  const [loginCheck, setLoginCheck] = useState(false);
  const { currentRecipeDetails } = useContext(currentRecipeContext);

  // Extract review IDs from the recipe
  const reviewIds = currentRecipeDetails?.reviews || [];
  console.log(recipeId);

  // Fetch the reviews associated with these IDs
  const { data, loading, refetch } = useQuery(GET_REVIEWS, {
    variables: { recipeId },
  });

  useLayoutEffect(() => {
    const isLoggedIn = Auth.loggedIn();
    setLoginCheck(isLoggedIn);

    refetch();

    if (isLoggedIn && reviewIds.length > 0) {
      refetch();
    }
  }, []);

  if (!loginCheck) {
    return null;
  }

  if (loading) return <p>Loading reviews...</p>;

  const reviews: Review[] = data?.getReviews || [];
  // If there are no reviews or no data, return null
  if (!reviews.length) {
    return null;
  }

  return (
    <div className="space-y-4 w-full max-w-md border p-4 rounded-md">
      <h3 className="font-semibold mb-2">Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map(({ _id, rating, comment, userName }) => (
          <div key={_id} className="border p-3 rounded-md mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-700 mt-2">{comment}</p>
            <p className="text-gray-500 italic mt-1">- {userName}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No reviews yet.</p>
      )}
    </div>
  );
}

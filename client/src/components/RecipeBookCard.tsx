import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RecipeBookCard = () => {
  const navigate = useNavigate()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Recipe Book
        </CardTitle>
        <CardDescription>Your personal collection of recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Access your saved recipes, organize them into categories, and quickly find your favorite dishes.
        </p>
        <Button onClick={() => navigate("/recipe-book")} className="w-full">
          Go to Recipe Book
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecipeBookCard

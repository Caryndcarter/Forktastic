import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RecipeMakerCard = () => {
  const navigate = useNavigate()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-6 w-6" />
          Recipe Maker
        </CardTitle>
        <CardDescription>Create and customize your own recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Craft your own unique recipes, add ingredients, instructions, and save them to your personal recipe book.
        </p>
        <Button onClick={() => navigate("/recipe-maker")} className="w-full">
          Go to Recipe Maker
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecipeMakerCard


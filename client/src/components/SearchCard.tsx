import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SearchCard = () => {
  const navigate = useNavigate()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-6 w-6" />
          Recipe Search
        </CardTitle>
        <CardDescription>Find new recipes to try</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Explore a vast collection of recipes from various cuisines. Search by ingredients, dietary restrictions, or
          meal types.
        </p>
        <Button onClick={() => navigate("/search")} className="w-full">
          Go to Search Page
        </Button>
      </CardContent>
    </Card>
  )
}

export default SearchCard
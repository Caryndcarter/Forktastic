import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import type Recipe from "../interfaces/recipe"
import { authService } from "../api/authentication"
import apiService from "../api/apiService"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const HomePage = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const getRandomRecipes = async () => {
    const fetchedRecipes = await apiService.forignRandomSearch()
    setRecipes(fetchedRecipes)
  }

  useEffect(() => {
    getRandomRecipes()
    const checkLogin = async () => {
      const loggedIn = await authService.loggedIn()
      setIsLoggedIn(loggedIn)
    }
    checkLogin()
  }, []) // Added [] to specify dependencies

  return (
    <div className="min-h-screen bg-[#fef3d0] pt-20 px-4">
      <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">
        {isLoggedIn ? "Welcome to Forktacular!" : "Discover Delicious Recipes"}
      </h1>

      {!isLoggedIn && (
        <div className="login-notice mb-8 text-center">
          <h2 className="text-2xl font-semibold text-[#a84e24] mb-4">
            Login to view all your recipes and more features!
          </h2>
        </div>
      )}

      {isLoggedIn && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate("/search")}
            className="bg-[#ff9e40] text-white p-4 rounded-lg shadow hover:bg-[#e7890c] transition-colors duration-300"
          >
            Search Recipes
          </button>
          <button
            onClick={() => navigate("/recipe-book")}
            className="bg-[#6fbf73] text-white p-4 rounded-lg shadow hover:bg-[#52a457] transition-colors duration-300"
          >
            My Recipe Book
          </button>
          <button
            onClick={() => navigate("/recipe-maker")}
            className="bg-[#be72c1] text-white p-4 rounded-lg shadow hover:bg-[#a854b2] transition-colors duration-300"
          >
            Create Recipe
          </button>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#a84e24] mb-4 text-center">
          {isLoggedIn ? "Discover New Recipes" : "Sample Recipes"}
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm mx-auto"
        >
          <CarouselContent>
            {recipes.map((recipe) => (
              <CarouselItem key={recipe._id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <RecipeCard recipe={recipe} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default HomePage


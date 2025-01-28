import "../index.css";
import RecipeCard from "../components/RecipeCard";
import Recipe from "../interfaces/recipe";
// import apiService from "../api/apiService";
import { useState, useEffect } from "react";
// import { retrieveRecipesByUser } from "../api/recipesAPI";

import { useQuery } from "@apollo/client";
import { GET_SAVED_RECIPES } from "@/utils_graphQL/queries";

export default function RecipeBook() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { data } = useQuery(GET_SAVED_RECIPES);

  useEffect(() => {
    if (data?.getRecipes) {
      setRecipes(data.getRecipes);
    }
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fef3d0]">
    {/* Content */}
    <div className="pt-20 px-4"> 
      <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">My Recipe Book</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
        {recipes.map((recipe) => 
          <RecipeCard recipe={recipe}></RecipeCard>
        )}
        
      </div>
    </div>
  </div>
  );
}

import "../index.css";
import RecipeCard from "../components/RecipeCard";
import Recipe from "../interfaces/recipe";
import apiService from "../api/apiService";
import { useState, useLayoutEffect, useEffect } from "react";
// import { retrieveRecipesByUser } from "../api/recipesAPI";

import { useQuery } from "@apollo/client";
import { GET_SAVED_RECIPES } from "@/utils_graphQL/queries";
import Navbar from "@/components/Navbar";

export default function RecipeBook() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { loading, refetch } = useQuery(GET_SAVED_RECIPES); // Remove data from destructuring since we're not using it directly

  useEffect(() => {
    const loadRecipes = async () => {
      if (loading) return;

      // Force refetch to get latest data
      const { data: refreshedData } = await refetch();

      if (refreshedData?.getRecipes?.length) {
        setRecipes(refreshedData.getRecipes);
        
      } else {
        
        try {
          const spoonRecipes = await apiService.forignRandomSearch();
          setRecipes(spoonRecipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    };

    loadRecipes();
  }, [loading, refetch]);

  // trigger the query each time the page is visited
  useLayoutEffect(() => {
    refetch();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fef3d0]">
      <Navbar />

      {/* Content */}
      <div className="pt-20 px-4">
        <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">
          My Recipe Book
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe}></RecipeCard>
          ))}
        </div>
      </div>
    </div>
  );
}

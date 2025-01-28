import "../index.css";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Recipe from "../interfaces/recipe";
// import apiService from "../api/apiService";
import { useState, useLayoutEffect, useEffect } from "react";
// import { retrieveRecipesByUser } from "../api/recipesAPI";

import { useQuery } from "@apollo/client";
import { GET_SAVED_RECIPES } from "@/utils_graphQL/queries";

export default function RecipeBook() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { data, refetch } = useQuery(GET_SAVED_RECIPES);

  // grab the recipes from the database
  useEffect(() => {
    if (data?.getRecipes) {
      setRecipes(data.getRecipes);
    }
  }, [data]);

  // trigger the query each time the page is visited
  useLayoutEffect(() => {
    refetch();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-10">
        {/* Forktacular button on the left */}
        <button
          onClick={() => navigate("/")}
          className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
        >
          Forktacular
        </button>

        {/* Title centered */}
        <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
          Recipe Search
        </div>

        {/* Navigation buttons on the right */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/search")}
            className="text-[#a84e24] hover:text-[#b7572e]"
          >
            Search Page
          </button>
          <button
            onClick={() => navigate("/recipe-maker")}
            className="text-[#a84e24] hover:text-[#b7572e]"
          >
            Recipe Maker
          </button>
          <button
            onClick={() => navigate("/user-info")}
            className="text-[#a84e24] hover:text-[#b7572e]"
          >
            Account
          </button>
        </div>
      </nav>

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

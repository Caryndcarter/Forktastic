import { useState, useLayoutEffect } from "react";
import "../index.css";
import RecipeCard from "../components/RecipeCard";
import type Recipe from "../interfaces/recipe";
import { authService } from "../api/authentication";
import apiService from "../api/apiService";
import Navbar from "@/components/Navbar";
import SearchCard from "../components/SearchCard";
import RecipeBookCard from "../components/RecipeBookCard";
import RecipeMakerCard from "../components/RecipeMakerCard";

const HomePage = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRandomRecipes = async () => {
    const recipes = await apiService.forignRandomSearch();
    setRecipes(recipes);
  };

  useLayoutEffect(() => {
    getRandomRecipes();

    const checkLogin = async () => {
      if (await authService.loggedIn()) {
        setLoginCheck(true);
      }
    };
    checkLogin();
  }, [authService.loggedIn]); // Removed getRandomRecipes from dependencies

  return (
    <div className="min-h-screen bg-[#fef3d0]">
      <Navbar />

      {/* Main Content */}
      {!loginCheck ? (
        <div className="login-notice">
          <br />
          <br />
          <br />
          <br />
          <h2 className="text-3xl font-bold text-[#a84e24] mb-4 text-center ">Login to Save, Edit and Create Recipes!</h2>

          <div className="pt-20 px-4">
            <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">
              Sample Recipes
            </h1>
            <div
              id="sample-recipies"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-20 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SearchCard />
            <RecipeBookCard />
            <RecipeMakerCard />
          </div>

          {/* Content */}
          <div className="pt-20 px-4">
            <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">
              Save New Recipes to Your Recipe Book
            </h1>
            <div
              id="sample-recipies"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

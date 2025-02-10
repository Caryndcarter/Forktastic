import Recipe from "../interfaces/recipe";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "@/utils_graphQL/queries";
import { RecipeDetails } from "@/interfaces";
import Auth from "@/utils_graphQL/auth";
import localData from "@/utils_graphQL/localStorageService";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({
  recipe: { _id, spoonacularId, title, image },
}: RecipeCardProps) {
  const [skipQuery, setSkipQuery] = useState<boolean>(true);
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: { mongoID: _id, spoonacularId: spoonacularId },
    skip: skipQuery,
  });
  const navigate = useNavigate();

  // on submit, trigger the graphQL querry
  const handleSubmit = async () => {
    // if logged in, trigger the query
    if (Auth.loggedIn()) {
      setSkipQuery(false);
    }

    // else, skip the query and go with spoonacular search
    else {
      const response = await apiService.forignInformationSearch(spoonacularId);
      localData.setCurrentRecipe(response);
      console.log(`Current recipe author: ${response.author}`);
      navigate("/recipe-showcase");
    }
  };

  // this effect will wait for the querry to finish executing, then proceed.
  useEffect(() => {
    // wait for the query to finish
    if (loading || skipQuery) {
      return;
    }

    // proceed after the data is retrived, continue
    handleRecipeSearch();
  }, [loading]);

  const handleRecipeSearch = async () => {
    let response: RecipeDetails;

    // if a valid response is obtained from the query, use that as the
    // recipe to showcase.
    if (data?.getRecipe?.recipe) {
      console.log("the recipe was found in our database.");
      response = data.getRecipe.recipe;
    }

    // otherwise, make a spoonacular API call to find the recipe
    else {
      console.log("the recipe was retrieved from spoonacular.");
      response = await apiService.forignInformationSearch(spoonacularId);
    }

    // update the context with the recipe, then go to the recipe showcase page.
    localData.setCurrentRecipe(response);
    console.log(`Current recipe author: ${response.author}`);
    navigate("/recipe-showcase");

    return;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105">
      {/* Recipe Image */}
      {image && (
        <img src={image} alt={`Recipe`} className="w-full h-56 object-cover" />
      )}

      <div className="p-6 bg-gradient-to-r from-[#f5d3a4] to-white">
        {/* Recipe Title */}
        <h2 className="text-2xl font-bold text-[#a84e24] mb-3">{title}</h2>

        {/* View Recipe Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-[#ff9e40] text-white py-2 rounded-lg shadow hover:bg-[#e7890c] transition-colors duration-200"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

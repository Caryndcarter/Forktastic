import '../index.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../interfaces/recipe';
import apiService from '../api/apiService';
import { useState, useEffect } from 'react';
import { retrieveRecipesByUser } from '../api/recipesAPI'


export default function RecipeBook() {
  const navigate = useNavigate();

  const [recipes,setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRecipes = await retrieveRecipesByUser();
      if (userRecipes && userRecipes.length > 0) {
        setRecipes(userRecipes); 
        console.log(userRecipes);
      } else {
        // Call a different function if no recipes exist
        console.log("no recipes on user");
        const randomRecipes = await apiService.forignRandomSearch();
        setRecipes(randomRecipes);
      }
    };
  
    fetchData();
  }, []); 

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
};
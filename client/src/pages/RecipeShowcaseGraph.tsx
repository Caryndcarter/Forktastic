import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { currentRecipeContext } from "../App";
//import { addRecipe, retrieveRecipeByUserId, deleteRecipe } from "../api/recipesAPI";
//import { authService } from '../api/authentication';
import { useState, useLayoutEffect} from 'react';

//new imports
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_RECIPE, DELETE_RECIPE } from '../utils_graphQL/mutations';
import { GET_LOGIN } from '../utils/queries';
import Auth from '../utils_graphQL/auth';



const RecipeShowcase = () =>  {
  const navigate = useNavigate();
  const { currentRecipeDetails } = useContext(currentRecipeContext);
  const [loginCheck,setLoginCheck] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  useLayoutEffect(() => {
    const checkLogin = async () => {
      console.log("Current recipe ID:", currentRecipeDetails.id);
  
      const isLoggedIn = await Auth.loggedIn();
      setLoginCheck(isLoggedIn);
  
      if (isLoggedIn && currentRecipeDetails.id) {
        try {
          setIsSaved(false); 
          const exists = await retrieveRecipeByUserId(currentRecipeDetails.id);
          console.log("Exists value:", exists);
          setIsSaved(true); 
        } catch (err) {
          console.error("Error retrieving recipe:", err);
          setIsSaved(false); // Default to false on error
        }
      } else {
        setIsSaved(false); // Not logged in or no recipe ID
      }
    };
  
    checkLogin();
  }, [currentRecipeDetails]);

  // Function to save recipe
   const saveRecipe = async () => {
   
    try {
      const result = await addRecipe(currentRecipeDetails);
      if (result && result.id) {
        currentRecipeDetails.id = result.id; // Update the ID with the one from the backend
      }
      setIsSaved(true); 
      navigate('/recipe-book');
    } catch (err) {
      console.error('Error saving recipe:', err);
      alert('Failed to save the recipe.');
    }
  };

  //Function to delete recipe
  const deleteCurrentRecipe = async () => {
    console.log("currrent REcipe detials ID:" + currentRecipeDetails.id);
    try {
      const result = await deleteRecipe(currentRecipeDetails.id); 
      console.log('Recipe delete response:', result);
      setIsSaved(false); 
      navigate('/recipe-book');
    } catch (err) {
      console.error('Error deleting recipe:', err);
      alert('Failed to delete recipe.');
    }
  };

  const RawHtmlRenderer = ({ htmlString }: { htmlString: string }) => {
    // Replace multiple line breaks with a single space or remove unwanted elements
    const cleanHtml = htmlString.replace(/<\/?[^>]+(>|$)/g, ""); // removes HTML tags if needed
    return <span dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
  };
  
  return (
    <div className="bg-[#fef3d0] min-h-screen pt-24"> {/* Added pt-24 to prevent content from being hidden behind the navbar */}
  <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto z-10">
    {/* Forktacular button on the left */}
    <button
      onClick={() => navigate('/')}
      className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
    >
      Forktacular
    </button>

    {/* Title centered */}
    <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
      My Recipe
    </div>

    {/* Account button on the right */}
    <div className="flex">
      <button
        onClick={() => navigate('/user-info')}
        className="text-[#a84e24] hover:text-[#b7572e]"
      >
        Account
      </button>
    </div>
  </nav>

  {/* Recipe Details */}
  <div className="max-w-2xl mx-auto p-6 bg-[#fadaae] shadow-lg rounded-lg mt-10 border border-gray-200">
    {/* Recipe Image */}
    {currentRecipeDetails.image && (
      <div className="mb-6 space-y-6">
        <img
          src={currentRecipeDetails.image}
          alt="Recipe"
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
    )}

    {/* Recipe Title */}
    <h2 className="text-3xl font-bold text-[#a84e24] mb-4">{currentRecipeDetails.title}</h2>
    
    {/* Save Button */}
   
      {/* Additional Info */}
      <div className="mb-6 space-y-2">
        {currentRecipeDetails.readyInMinutes && (
          <h4 className="text-lg font-bold text-[#a84e24]">
            Ready in: <span className="text-black font-medium">{currentRecipeDetails.readyInMinutes} minutes</span>
          </h4>
        )}
        {currentRecipeDetails.servings && (
          <h4 className="text-lg font-bold text-[#a84e24]">
            Servings: <span className="text-black font-medium">{currentRecipeDetails.servings}</span>
          </h4>
        )}
        {currentRecipeDetails.diets && currentRecipeDetails.diets.length > 0 && (
            <h4 className="text-lg font-bold text-[#a84e24]">
              Diets: <span className="text-black font-medium">{currentRecipeDetails.diets.join(', ')}</span>
            </h4>
          )}
      

      {loginCheck ? (
       <button
       onClick={isSaved ? deleteCurrentRecipe : saveRecipe}
       className={`font-semibold py-2 px-4 rounded mb-6 transition-colors duration-300 ${
         isSaved
           ? 'bg-red-500 hover:bg-red-600 text-white'
           : 'bg-[#a84e24] hover:bg-green-600 text-white' 
       }`}
     >
       {isSaved ? 'Delete Recipe' : 'Save Recipe'}
     </button>
         ) : (
          <div className="text-gray-500 italic mb-6">Log in to save recipes.</div>
        )}
      
      </div>

     {/* Recipe Summary */}
     <div className="mb-8">
      <h3 className="text-2xl font-semibold text-[#a84e24] mb-8">Summary</h3>
      {/* Render the instructions as HTML */}
      <RawHtmlRenderer htmlString={currentRecipeDetails.summary} />
    </div>

    {/* Ingredients List */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#a84e24] mb-8">Ingredients</h3>
        <ul className="list-disc list-inside space-y-2">
          {currentRecipeDetails.ingredients?.map((ingredient: string, index: number) => (
            <li key={index} className="text-gray-800">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

    {/* Cooking Instructions */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-[#a84e24] mb-8">Instructions</h3>
      {/* Render the instructions as HTML */}
      <RawHtmlRenderer htmlString={currentRecipeDetails.instructions} />
    </div>

      {/* Steps List */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#a84e24] mb-8">Steps</h3>
        <ol className="list-decimal list-inside space-y-2">
          {currentRecipeDetails.steps?.map((step: string, index: number) => (
            <li key={index} className="text-gray-800">
              <RawHtmlRenderer htmlString={step} />
            </li>
          ))}
        </ol>
      </div>

    {/* Recipe Source Links */}
    <div className="mb-8 flex space-x-4">
        {currentRecipeDetails.sourceUrl && (
          <h4 className="text-lg font-bold text-[#a84e24]">
            <a
              href={currentRecipeDetails.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium underline"
            >
              Recipe Source 
            </a>
          </h4>
        )}
        {currentRecipeDetails.spoonacularSourceUrl && (
          <h4 className="text-lg font-bold text-[#a84e24]">
            <a
              href={currentRecipeDetails.spoonacularSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium underline"
            >
              Spoonacular Recipe
            </a>
          </h4>
        )}
      </div>

  </div>
</div>
  );
};

export default RecipeShowcase;
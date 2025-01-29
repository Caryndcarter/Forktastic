import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { currentRecipeContext } from "../App";
import RecipeDetails from "../interfaces/recipeDetails";
import askService from "../api/askService";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

const RecipeMaker = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentRecipeDetails } = useContext(currentRecipeContext);
  const [prompt, setPrompt] = useState<string>("");
  const [AILoading, setAILoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<RecipeDetails>({
    title: "",
    summary: "",
    readyInMinutes: 0,
    servings: 0,
    ingredients: [""],
    instructions: "",
    steps: [],
    diets: [],
    image: "",
  });

  const handleChange = (field: keyof RecipeDetails, value: any) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleListChange = (
    field: keyof RecipeDetails,
    index: number,
    value: string
  ) => {
    const updatedList = [...(recipe[field] as string[])];
    updatedList[index] = value;
    setRecipe((prev) => ({
      ...prev,
      [field]: updatedList,
    }));
  };

  const handleAddItem = (field: keyof RecipeDetails) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [...(recipe[field] as string[]), ""],
    }));
  };

  const handleRemoveItem = (field: keyof RecipeDetails, index: number) => {
    const updatedList = [...(recipe[field] as string[])];
    updatedList.splice(index, 1);
    setRecipe((prev) => ({
      ...prev,
      [field]: updatedList,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe.image) {
      if (recipe.image.length > 250) {
        setErrorMessage("Error: URL is too long");
        return;
      }
    }
    setCurrentRecipeDetails(recipe);
    navigate("/recipe-showcase");
  };

  const handleAiCall = async (e: any) => {
    e.preventDefault();
    setAILoading(true);
    const response = await askService.askForRecipe(prompt);
    const recipe = response.formattedResponse;
    setRecipe((prev) => ({
      ...prev,
      title: recipe.title,
      summary: recipe.Summary,
      readyInMinutes: recipe.ReadyInMinutes,
      servings: recipe.Servings,
      ingredients: recipe.Ingredients.split(";"),
      instructions: recipe.Instructions,
      diets: recipe.Diets.split(";"),
      steps: recipe.Steps.split(";"),
    }));
    setAILoading(false);
  };

  return (
    <div className="bg-[#fef3d0] min-h-screen pt-24 px-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8">Create a Recipe</h1>

      <form
        onSubmit={handleAiCall}
        className="w-full max-w-3xl mx-auto p-6 rounded-lg space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="prompt" className="font-bold">
            Prompt
          </Label>
          <div className="relative">
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-[150px] pr-24 pl-10"
              placeholder="Enter your prompt here..."
            />
            {AILoading && (
              <div className="absolute left-3 bottom-3">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            )}
            <Button
              type="submit"
              className="absolute right-3 bottom-3"
              disabled={AILoading || !prompt.trim()}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
      </form>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#fadaae] p-6 shadow-lg rounded-lg space-y-4 border border-gray-200"
      >
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Summary</label>
          <textarea
            value={recipe.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Ready In Minutes</label>
          <input
            type="number"
            value={recipe.readyInMinutes}
            onChange={(e) => handleChange("readyInMinutes", +e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Servings</label>
          <input
            type="number"
            value={recipe.servings}
            onChange={(e) => handleChange("servings", +e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleListChange("ingredients", index, e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("ingredients", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("ingredients")}
            className="text-blue-500"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label className="block font-bold mb-1">Instructions</label>
          <textarea
            value={recipe.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Diets Section */}
        <div>
          <label className="block font-bold mb-1">Diets</label>
          {(recipe.diets ?? []).map((diet, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                id="diet"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                onChange={(e) =>
                  handleListChange("diets", index, e.target.value)
                }
              >
                <option disabled selected>
                  {diet}
                </option>
                <option value="">None</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveItem("diets", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("diets")}
            className="text-blue-500"
          >
            Add Diet
          </button>
        </div>

        {/* Steps Section */}
        <div>
          <label className="block font-bold mb-1">Steps</label>
          {(recipe.steps ?? []).map((step, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={step}
                onChange={(e) =>
                  handleListChange("steps", index, e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("steps", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("steps")}
            className="text-blue-500"
          >
            Add Step
          </button>
        </div>

        <div>
          <label className="block font-bold mb-1">Image URL</label>
          <input
            type="text"
            value={recipe.image ?? ""} // Handle null value
            onClick={(event: any) => {
              event.target.select();
            }}
            onChange={(e) => {
              const imageURL = e.target.value;
              setRecipe({ ...recipe, image: imageURL });
              if (imageURL.length > 250) {
                setErrorMessage("Error: URL is too long");
              } else {
                setErrorMessage("");
              }
            }}
            className="p-2 border rounded w-full"
          />
        </div>

        <p className="text-red-500 font-medium mt-2 text-sm">{errorMessage}</p>
        <button
          type="submit"
          className="w-full bg-[#a84e24] text-white font-bold p-2 rounded"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeMaker;

import { useState, useEffect } from "react";
import { filterInfo } from "./SearchPage";
import DropDownSelection from "./DropDownSelection";
import DropDownMultiSelect from "./DropDownMultiSelect";
import InputMultiSelect from "./InputMultiSelect";

interface filterFormProps {
  filterValue: filterInfo;
  setFilterValue: any;
  setFilterVisible: any;
}

export default function FilterForm({
  filterValue,
  setFilterValue,
  setFilterVisible,
}: filterFormProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleFilterUpdate = (e: any) => {
    e.preventDefault();
    //console.log(filterValue);
    setFilterVisible(false);
  };

  const addIngredient = (e: any) => {
    e.preventDefault();

    if (filterValue.includeIngredients.includes(selectedIngredient)) {
      //console.log("This ingredient is already in the user settings");
      return;
    }

    if (selectedIngredient === "") {
      //console.log("Please enter an ingredient.");
      return;
    }

    const updatedIngredients = [
      ...filterValue.includeIngredients,
      selectedIngredient,
    ];

    setFilterValue((previousValues: filterInfo) => ({
      ...previousValues,
      includeIngredients: updatedIngredients,
    }));

    setSelectedIngredient("");
    setSubmitted(true);
  };

  const removeIngredient = (ingredient: string) => {
    // Filter out the specified ingredient
    const updatedIngredients = filterValue.includeIngredients.filter(
      (item) => item !== ingredient
    );

    // Update the filterValue state
    setFilterValue((previousValues: filterInfo) => ({
      ...previousValues,
      includeIngredients: updatedIngredients,
    }));
  };

  //attempting to make the setSelectedIngredient reset after hitting the plus button, needs work
  useEffect(() => {
    if (submitted) {
      //console.log("Clearing selected ingredient");
      setSelectedIngredient("");
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <form onSubmit={handleFilterUpdate} className="space-y-6">
      <section className="Filters-info">
        <p className="text-sm text-gray-500">
          Filters are set from your Account Preferences, but you can change them
          here to experiment.
        </p>
      </section>

      <DropDownSelection
        name="Diet"
        placeholder="Select a diet"
        initialSelection={filterValue.diet}
        options={[
          "Gluten Free",
          "Ketogenic",
          "Vegetarian",
          "Lacto-Vegetarian",
          "Ovo-Vegetarian",
          "Vegan",
          "Pescetarian",
          "Paleo",
          "Primal",
          "Low FODMAP",
          "Whole30",
        ]}
      ></DropDownSelection>

      <DropDownMultiSelect
        name="Intolerances"
        placeholder="Select your Intolerances"
        options={[
          "Dairy",
          "Egg",
          "Gluten",
          "Grain",
          "Peanut",
          "Seafood",
          "Sesame",
          "Shellfish",
          "Soy",
          "Sulfite",
          "Tree Nut",
          "Wheat",
        ]}
        initialSelection={filterValue.intolerances}
      ></DropDownMultiSelect>

      <DropDownSelection
        name="Cuisine"
        placeholder={filterValue.diet ? filterValue.diet : "Select a Cuisine"}
        options={[
          "African",
          "Asian",
          "American",
          "British",
          "Cajun",
          "Caribbean",
          "Chinese",
          "Eastern European",
          "European",
          "French",
          "German",
          "Greek",
          "Indian",
          "Irish",
          "Italian",
          "Japanese",
          "Jewish",
          "Korean",
          "Latin American",
          "Mediterranean",
          "Mexican",
          "Middle Eastern",
          "Nordic",
          "Southern",
          "Spanish",
          "Thai",
          "Vietnamese",
        ]}
      ></DropDownSelection>

      <InputMultiSelect
        name="Required Ingredient"
        placeholder="Select an ingredient you want to cook with"
        initialSelection={filterValue.includeIngredients}
      ></InputMultiSelect>

      <section className="ingredients-section">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="intolerance"
        >
          Select required ingredients
        </label>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            name="includeIngredients"
            id="ingredients-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            placeholder="Enter an ingredient"
            onChange={(e: any) => {
              setSelectedIngredient(e.target.value);
            }}
          />
          <button
            onClick={addIngredient}
            // disabled={!selectedIntolerance}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <ul>
          {filterValue.includeIngredients.map((item) => {
            return (
              <li
                key={item}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm m-2"
              >
                <span className="text-gray-800">{item}</span>
                <button
                  onClick={() => {
                    removeIngredient(item);
                  }}
                  className="text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
                  aria-label={`Remove ${item}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          id="submit-search-filters"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Update Filters
        </button>
      </div>
    </form>
  );
}

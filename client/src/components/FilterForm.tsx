import { useState} from "react";
import { filterInfo } from "../pages/SearchPage";

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


  const handleFilterUpdate = (e: any) => {
    e.preventDefault();
    //console.log(filterValue);
    setFilterVisible(false);
  };

  const handleChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      [e.target.id]: e.target.value,
    });
  };

  const addIntolerance = (event: any) => {
    event.preventDefault();
    const selectedIntolerance = event.target.value;
    event.target.value = "";

    if (filterValue.intolerances.includes(selectedIntolerance)) {
      //console.log("This intolerence is already in the user settings");
      return;
    }

    if (selectedIntolerance === "") {
      //console.log("Please select a dropdown");
      return;
    }

    const updatedIntolerances = [
      ...filterValue.intolerances,
      selectedIntolerance,
    ];

    setFilterValue((previousValues: filterInfo) => ({
      ...previousValues,
      intolerance: updatedIntolerances,
    }));
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
  };

  const removeIntolerance = (intolerance: string) => {
    // Filter out the specified intolerance
    const updatedIntolerances = filterValue.intolerances.filter(
      (item) => item !== intolerance
    );

    // Update the formValues state
    setFilterValue((previousValues: filterInfo) => ({
      ...previousValues,
      intolerance: updatedIntolerances,
    }));
  };

  return (
    <form onSubmit={handleFilterUpdate} className="space-y-6">
      <section className="Diet-section">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="diet"
        >
          Diet
        </label>
        <select
          id="diet"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          onChange={handleChange}
        >
          <option disabled selected>
            {filterValue.diet ? filterValue.diet : "Select a diet"}
          </option>
          <option value="None">None</option>
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
      </section>

      <section className="Intolerance-section">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="intolerance"
        >
          Intolerance
        </label>

        <div className="flex items-center space-x-2">
          <select
            id="intolerance"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            onChange={(event: any) => {
              addIntolerance(event);
            }}
          >
            <option selected value="">
              Select an intolerance
            </option>
            <option value="Dairy">Dairy</option>
            <option value="Egg">Egg</option>
            <option value="Gluten">Gluten</option>
            <option value="Grain">Grain</option>
            <option value="Peanut">Peanut</option>
            <option value="Seafood">Seafood</option>
            <option value="Sesame">Sesame</option>
            <option value="Shellfish">Shellfish</option>
            <option value="Soy">Soy</option>
            <option value="Sulfite">Sulfite</option>
            <option value="Tree Nut">Tree Nut</option>
            <option value="Wheat">Wheat</option>
          </select>
        </div>

        <ul>
          {filterValue.intolerances.map((item) => {
            return (
              <li
                key={item}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm m-2"
              >
                <span className="text-gray-800">{item}</span>
                <button
                  onClick={() => {
                    removeIntolerance(item);
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

      <section className="Cuisine-section">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="cuisine"
        >
          Cuisine
        </label>

        <select
          id="cuisine"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          onChange={handleChange}
        >
          <option disabled selected>
            {filterValue.cuisine ? filterValue.cuisine : "Select a cuisine"}
          </option>
          <option value="">None</option>
          <option value="African">African</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Cajun">Cajun</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern European">Eastern European</option>
          <option value="European">European</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Greek">Greek</option>
          <option value="Indian">Indian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Jewish">Jewish</option>
          <option value="Korean">Korean</option>
          <option value="Latin American">Latin American</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="Southern">Southern</option>
          <option value="Spanish">Spanish</option>
          <option value="Thai">Thai</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
      </section>

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
            id="intolerance"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            placeholder="Enter an intolerance"
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
                    removeIntolerance(item);
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
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Update Filters
        </button>
      </div>
    </form>
  );
}

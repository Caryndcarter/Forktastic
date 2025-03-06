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
  const handleFilterUpdate = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setFilterValue({ ...filterValue });
    setFilterVisible(false);
  };

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
        placeholder="Enter an ingredient(s) you want to cook with"
        initialSelection={filterValue.includeIngredients}
      ></InputMultiSelect>

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

import { DropDownMultiSelect, DropDownSelection } from "@/components/forms";

const dietOptions = [
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
];

const intoleranceOptions = [
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
];

interface DietFormProps {
  formValues: any;
  handleSubmit: any;
}

export default function DietForm({ formValues, handleSubmit }: DietFormProps) {
  // const submitFilterUpdate = (event: any) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const updatedFilter: any = Object.fromEntries(formData.entries());

  //   updatedFilter.intolerances = [];
  //   updatedFilter.includeIngredients = [];

  //   for (const [key, value] of formData) {
  //     const stringValue = value as string;

  //     if (key.includes("intolerance")) {
  //       stringValue ? updatedFilter.intolerances.push(stringValue) : null;
  //       delete updatedFilter[key];
  //     }

  //     if (key.includes("required ingredient")) {
  //       stringValue ? updatedFilter.includeIngredients.push(stringValue) : null;
  //       delete updatedFilter[key];
  //     }
  //   }
  //   console.log(updatedFilter);
  // };

  return (
    <>
      <form id="filter-form" onSubmit={handleSubmit} className="space-y-6">
        <DropDownSelection
          name="Diet"
          placeholder="Select a diet"
          initialSelection={formValues.diet}
          options={dietOptions}
        ></DropDownSelection>

        <DropDownMultiSelect
          name="Intolerance"
          placeholder="Select your Intolerances"
          options={intoleranceOptions}
          initialSelection={formValues.intolerances}
        ></DropDownMultiSelect>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            id="submit-search-filters"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Update Preferences
          </button>
        </div>
      </form>
    </>
  );
}

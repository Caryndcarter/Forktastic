import { useState, useCallback, useRef, useLayoutEffect } from "react";
import Recipe from "../interfaces/recipe";
import RecipeCard from "../components/RecipeCard";
import FilterForm from "../components/FilterForm";
import apiService from "../api/apiService";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_PREFERENCES } from "@/utils_graphQL/queries";
import Navbar from "@/components/Navbar";

export interface filterInfo {
  diet?: string;
  cuisine?: string;
  intolerances: string[];
  includeIngredients: string[];
}

const RecipeSearchPage: React.FC = () => {
  const queryReference = useRef<HTMLInputElement | null>(null);
  const [results, setResults] = useState<Recipe[]>([]); // Store the search results
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [filterVisible, setFilterVisible] = useState<boolean>(false); // Track filter form visibility
  const [filterValue, setFilterValue] = useState<filterInfo>({
    intolerances: [],
    includeIngredients: [],
  });
  const { data } = useQuery(GET_ACCOUNT_PREFERENCES);

  // stategicly trigger re-searches for responsivness
  // this code triggers on two scenarios:
  // 1: before the page first loads
  // 2: when the filter value is updated
  useLayoutEffect(() => {
    // this code shouldn't trigger when the filter opens
    if (filterVisible) return;

    // manually trigger a change event
    if (queryReference.current) {
      handleChange({
        target: queryReference.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [filterVisible]);

  // fetch account profile details, then uses them for the
  // default filter value.
  //
  // this code triggers before the page first loads
  // this code re-triggers when the data changes
  useLayoutEffect(() => {
    // fetch diets information
    if (data?.getUser.diet) {
      setFilterValue((prev) => ({
        ...prev,
        diet: data.getUser.diet,
      }));
    }
    // fetch intolerance information
    if (data?.getUser.intolerances) {
      setFilterValue((prev) => ({
        ...prev,
        intolerances: data.getUser.intolerances,
      }));
    }
  }, [data]);

  // this code is the actual search logic.
  const handleSearch = async (queryText: string) => {
    setLoading(true);

    // if the search is empty, get random recipes instead
    if (!queryText) {
      const recipes = await apiService.forignRandomSearch();
      setResults(recipes);
      setLoading(false);
      return;
    }

    const searchParams: any = {
      query: queryText,
    };

    if (filterValue.cuisine) {
      searchParams.cuisine = filterValue.cuisine;
    }

    if (filterValue.diet) {
      searchParams.diet = filterValue.diet;
    }

    if (filterValue.intolerances.length > 0) {
      searchParams.intolerance = filterValue.intolerances;
    }

    if (filterValue.includeIngredients.length > 0) {
      searchParams.includeIngredients =
        filterValue.includeIngredients.join(",");
    }

    const recipes = await apiService.forignRecipeSearch(searchParams);
    setResults(recipes);
    setLoading(false);
  };

  // this code parses the user's search string and then
  // uses a debounced search (de-bouncing means it will
  // only trigger once per delay period)
  const handleChange = async (e: any) => {
    const queryText = e.target.value;
    debouncedHandleSearch(queryText);
  };

  // debouncing logic
  const debounce = (mainFunction: any, delay: number) => {
    let timer: any;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 360), [
    filterValue,
  ]);

  return (
    <div
      className={`min-h-screen bg-[#fef3d0] ${
        filterVisible ? "filter-blur" : ""
      }`}
    >
      <Navbar />

      {/* Main Content */}
      <div className="pt-20 px-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            id="search-input"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#ff9e40]"
            placeholder="Search for recipes..."
            onChange={handleChange}
            ref={queryReference}
          />
          <button
            id="filter-toggle-button"
            className="ml-2 bg-[#ff9e40] text-white px-4 py-2 rounded-md hover:bg-[#e7890c] transition-colors"
            onClick={() => setFilterVisible(true)} // Show filter form
          >
            Filter
          </button>
        </div>

        {/* Search Results */}
        <div
          id="search-results"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {loading ? (
            <p>Loading...</p>
          ) : !results ? (
            <p>Something went wrong...</p>
          ) : results.length === 0 ? (
            <p>No results found...</p>
          ) : (
            results.map((recipe) => <RecipeCard recipe={recipe} />)
          )}
        </div>
      </div>

      {/* Filter Form Modal */}
      {filterVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div
            id="filter-form"
            className="bg-white p-4 rounded-lg shadow-lg relative"
          >
            <button
              id="close-filter"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setFilterVisible(false)} // Hide filter form
            >
              ×
            </button>
            <FilterForm
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              setFilterVisible={setFilterVisible}
            ></FilterForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearchPage;

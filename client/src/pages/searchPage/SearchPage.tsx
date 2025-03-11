import { useState, useCallback, useRef, useLayoutEffect } from "react";
import type Recipe from "@/interfaces/recipe";
import FilterForm from "./FilterForm";
import apiService from "@/api/apiService";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_PREFERENCES } from "@/utils_graphQL/queries";
import Results from "./Results";
import localStorageService from "@/utils_graphQL/localStorageService";
import { ActiveFilters } from "./ActiveFilters";

export interface filterInfo {
  diet?: string;
  cuisine?: string;
  intolerances: string[];
  includeIngredients: string[];
}

const SearchPage: React.FC = () => {
  const queryReference = useRef<HTMLInputElement | null>(null);
  const [results, setResults] = useState<Recipe[]>([]); // Store the search results
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [filterVisible, setFilterVisible] = useState<boolean>(false); // Track filter form visibility
  const [filterValue, setFilterValue] = useState<filterInfo>({
    intolerances: [],
    includeIngredients: [],
  });
  const { data } = useQuery(GET_ACCOUNT_PREFERENCES);

  // retrieve query
  useLayoutEffect(() => {
    const query = localStorageService.getQuery();
    console.log(query);
    if (queryReference.current) {
      queryReference.current.value = query;
    }
  }, []);

  // fetch account profile details
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

  // manually trigger the search
  useLayoutEffect(() => {
    if (queryReference.current) {
      handleChange({
        target: queryReference.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [filterValue]);

  const handleSearch = async (queryText: string) => {
    setLoading(true);

    if (!queryText) {
      const newRecipes = await apiService.forignRandomSearch();
      setResults(newRecipes);
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

  // uses a debounced search
  const handleChange = async (e: any) => {
    const queryText = e.target.value;
    debouncedHandleSearch(queryText);
  };

  // debouncing logic
  const debounce = (mainFunction: any, delay: number) => {
    let timer: any;
    return (...args: any) => {
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
      {/* Main Content */}
      <main className="pt-20 px-4">
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

        {/* Active Filters Display */}
        <ActiveFilters filterValue={filterValue} />

        {/* Search Results */}
        <Results results={results} loading={loading} />

        {/* Filter Form Modal */}
        {filterVisible && (
          <FilterForm
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            setFilterVisible={setFilterVisible}
          ></FilterForm>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

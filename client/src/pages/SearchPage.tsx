import { useState, useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Recipe from '../interfaces/recipe';
import RecipeCard from '../components/RecipeCard';
import FilterForm from '../components/FilterForm';
import { getAccountInformation } from '../api/usersAPI';
import apiService from '../api/apiService';


export interface filterInfo {
  diet?:string,
  cuisine?:string,
  intolerance:string[],
  includeIngredients:string[],
}


const RecipeSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Track the search query
  const [results, setResults] = useState<Recipe[]>([]); // Store the search results
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [filterVisible, setFilterVisible] = useState<boolean>(false); // Track filter form visibility
  const [filterValue,setFilterValue] = useState<filterInfo>({
    intolerance:[],
    includeIngredients:[],
  });

  const navigate = useNavigate();

  const getRandomRecipes = async() => {
    const recipes = await apiService.forignRandomSearch();
    setResults(recipes);
  }

  useLayoutEffect(() => {
    getRandomRecipes();
    const getInfo = async () => {
      const response = await getAccountInformation();
      const accountInfo:any = await response.json();
      setFilterValue({
          diet: accountInfo.diet? accountInfo.diet : '',
          intolerance: accountInfo.intolerance? accountInfo.intolerance : [],
          includeIngredients:[],
      });
    }
    getInfo();
  },[]);

  const handleChange = async (e: any) => {
    const queryText = e.target.value;
    setQuery(queryText);
    if (queryText.trim() === '') {
      setResults([]);
      return;
    }
    debouncedHandleSearch(queryText);
  };

  const debounce = (mainFunction: any, delay: number) => {
    let timer: any;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const handleSearch = async (queryText: string) => {
    setLoading(true);
    const searchParams: any = {
      query: queryText,
    };

    if(filterValue.cuisine){
      searchParams.cuisine = filterValue.cuisine;
    }

    if(filterValue.diet){
      searchParams.diet = filterValue.diet;
    }

    if(filterValue.intolerance.length > 0){
      searchParams.intolerance = filterValue.intolerance;
    }

    if (filterValue.includeIngredients.length > 0) {
      searchParams.includeIngredients = filterValue.includeIngredients.join(',');
    }

    console.log(searchParams);

    const recipes = await apiService.forignRecipeSearch(searchParams);
    setResults(recipes);
    setLoading(false);
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [filterValue]);

  return (
    <div className={`min-h-screen bg-[#fef3d0] ${filterVisible ? 'filter-blur' : ''}`}>
      {/* Main Content */}
      <div className="pt-20 px-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#ff9e40]"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleChange}
          />
          <button
            className="ml-2 bg-[#ff9e40] text-white px-4 py-2 rounded-md hover:bg-[#e7890c] transition-colors"
            onClick={() => setFilterVisible(true)} // Show filter form
          >
            Filter
          </button>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setFilterVisible(false)} // Hide filter form
            >
              ×
            </button>
            <FilterForm 
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              setFilterVisible={setFilterVisible}>
            </FilterForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearchPage;

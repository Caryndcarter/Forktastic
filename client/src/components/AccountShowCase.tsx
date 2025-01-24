import { authService } from "../api/authentication";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { getAccountInformation, putAccountInformation } from "../api/usersAPI";

interface accountShowCaseProps {
  setLoginCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

interface accountInfo {
  diet: string;
  intolerance: string[];
}

export default function AccountShowCase({
  setLoginCheck,
}: accountShowCaseProps) {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<accountInfo>({
    diet: "",
    intolerance: [],
  });

  useLayoutEffect(() => {
    const getInfo = async () => {
      const response = await getAccountInformation();
      const accountInfo: any = await response.json();
      setFormValues({
        diet: accountInfo.diet ? accountInfo.diet : "",
        intolerance: accountInfo.intolerance ? accountInfo.intolerance : [],
      });
    };
    getInfo();
  }, []);

  const handleLogOut = () => {
    authService.logout();
    setLoginCheck(false);
  };

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleAccountUpdate = (e: any) => {
    e.preventDefault();
    putAccountInformation(formValues);
    navigate("/");
  };

  const addIntolerance = (event: any) => {
    event.preventDefault();
    const selectedIntolerance = event.target.value;
    event.target.value = "";

    if (formValues.intolerance.includes(selectedIntolerance)) {
      console.log("This intolerence is already in the user settings");
      return;
    }

    if (selectedIntolerance === "") {
      console.log("Please select a dropdown");
      return;
    }

    const updatedIntolerances = [
      ...formValues.intolerance,
      selectedIntolerance,
    ];

    setFormValues((previousValues: accountInfo) => ({
      ...previousValues,
      intolerance: updatedIntolerances,
    }));
  };

  const removeIntolerance = (intolerance: string) => {
    // Filter out the specified intolerance
    const updatedIntolerances = formValues.intolerance.filter(
      (item) => item !== intolerance
    );

    // Update the formValues state
    setFormValues((previousValues: accountInfo) => ({
      ...previousValues,
      intolerance: updatedIntolerances,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <form onSubmit={handleAccountUpdate} className="space-y-6">
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
              {formValues.diet ? formValues.diet : "select a diet"}
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
            {formValues.intolerance.map((item) => {
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
            Update Preferences
          </button>
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={handleLogOut}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

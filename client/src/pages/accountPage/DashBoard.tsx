import auth from "@/utils_graphQL/auth";
// import { useNavigate } from "react-router-dom"
import { useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT_PREFERENCES } from "@/utils_graphQL/mutations";
import { DELETE_USER } from "@/utils_graphQL/mutations";
import localStorageService from "@/utils_graphQL/localStorageService";
import { toast } from "sonner";
import DietForm from "./DietForm";
import { DietaryNeeds } from "@/interfaces";

export default function DashBoard() {
  const [dietNeeds, setDietNeeds] = useState<DietaryNeeds>({
    diet: "",
    intolerances: [],
  });

  const [updateAccount] = useMutation(UPDATE_ACCOUNT_PREFERENCES);
  const [deleteUser] = useMutation(DELETE_USER);

  useLayoutEffect(() => {
    const diet = localStorageService.getAccountDiet();
    setDietNeeds(diet);
  }, []);

  const handleLogOut = () => {
    auth.logout();
  };

  const handleAccountUpdate = async (e: any) => {
    e.preventDefault();

    try {
      await updateAccount({
        variables: {
          diet: dietNeeds.diet,
          intolerances: dietNeeds.intolerances,
        },
      });

      localStorageService.setAccountDiet(dietNeeds);

      // Show success toast with custom styling
      toast.success("Preferences updated", {
        description: "Your dietary preferences have been successfully saved.",
        dismissible: true,
        icon: "🍽️",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Update failed", {
        description: "There was a problem updating your preferences.",
        dismissible: true,
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUser();

      if (data?.deleteUser?._id) {
        // Show success toast for account deletion
        toast.success("Account deleted", {
          description: "Your account has been successfully deleted.",
          dismissible: true,
          icon: "👋",
        });

        // Log the user out but don't navigate away immediately
        handleLogOut();

        // Optional: You could add a slight delay before navigation if you want
        // the user to see the toast before being redirected
        setTimeout(() => {
          // navigate("/")
        }, 3000);
      } else {
        // Show error toast for failed deletion
        toast.error("Delete failed", {
          description: "Failed to delete account. Please try again.",
          dismissible: true,
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      // Show error toast for exceptions
      toast.error("Delete failed", {
        description:
          "There was an issue deleting your account. Please try again.",
        dismissible: true,
      });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-[#a84e24]">
        Dietary Preferences
      </h2>

      <p className="text-sm text-[#6B2A29] text-center mb-4">
        Register your preferences for use in recipe search filters.
      </p>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <DietForm
          formValues={dietNeeds}
          handleSubmit={handleAccountUpdate}
        ></DietForm>

        <div className="mt-6">
          <button
            onClick={handleLogOut}
            id="log-out-button"
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Log out
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={handleDeleteUser}
            id="delete-account-button"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}

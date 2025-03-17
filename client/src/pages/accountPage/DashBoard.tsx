import auth from "@/utils_graphQL/auth";
// import { useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_PREFERENCES } from "@/utils_graphQL/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT_PREFERENCES } from "@/utils_graphQL/mutations";
import { DELETE_USER } from "@/utils_graphQL/mutations";
import { toast } from "sonner";
import DietForm from "./DietForm";

interface accountShowCaseProps {
  setLoginCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

interface accountInfo {
  diet: string;
  intolerances: string[];
}

export default function DashBoard({ setLoginCheck }: accountShowCaseProps) {
  // const navigate = useNavigate()

  const [formValues, setFormValues] = useState<accountInfo>({
    diet: "",
    intolerances: [],
  });

  const { loading, refetch } = useQuery(GET_ACCOUNT_PREFERENCES);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT_PREFERENCES);
  const [deleteUser] = useMutation(DELETE_USER);

  useEffect(() => {
    const loadPreferences = async () => {
      if (loading) return;

      // Force refetch to get latest data
      const { data: refreshedData } = await refetch();

      if (refreshedData?.getUser) {
        setFormValues((prev) => ({
          ...prev,
          diet: refreshedData.getUser.diet || "",
          intolerances: refreshedData.getUser.intolerances || [],
        }));
      }
    };

    loadPreferences();
  }, [loading, refetch]);

  // Refetch when component mounts
  useLayoutEffect(() => {
    refetch();
  }, []);

  const handleLogOut = () => {
    auth.logout();
    setLoginCheck(false);
  };

  const handleAccountUpdate = async (e: any) => {
    e.preventDefault();
    console.log("Updating diet with value:", formValues.diet);

    try {
      await updateAccount({
        variables: {
          diet: formValues.diet,
          intolerances: formValues.intolerances,
        },
      });

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

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

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
          formValues={formValues}
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

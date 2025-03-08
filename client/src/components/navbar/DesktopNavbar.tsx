import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import localStorageService from "@/utils_graphQL/localStorageService";
// import { Input } from "@/components/ui/input";
import {
  Home,
  ArrowLeft,
  User,
  BookOpen,
  Utensils,
  Heart,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { page } from ".";

interface DesktopNavbarProps {
  pages: page[];
  loggedIn: boolean;
}

export default function DesktopNavbar({ pages, loggedIn }: DesktopNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const searchListener = (event: any) => {
    // this will only trigger when hitting "enter"
    if (event.key !== "Enter") {
      return;
    }
    const inputValue = (event.target as HTMLInputElement).value;
    localStorageService.setQuery(inputValue);

    // if already on the search page, reload
    if (location.pathname === "/search") {
      window.location.reload();
    } else {
      navigate("/search");
    }
  };

  // Map page names to appropriate icons
  const getIconForPage = (pageName: string) => {
    switch (pageName.toLowerCase()) {
      case "recipes":
        return <Utensils className="w-5 h-5" />;
      case "favorites":
        return <Heart className="w-5 h-5" />;
      case "browse":
        return <BookOpen className="w-5 h-5" />;
      case "search":
        return <Search className="w-5 h-5" />;
      case "settings":
        return <Settings className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <nav
      id="desktop-navbar"
      className="fixed top-0 left-0 right-0 bg-[#ff9e40] p-4 shadow-md z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col relative">
        {/* Top row with back button, title, search, and account */}
        <div className="flex justify-between items-center w-full mb-2">
          <div className="flex items-center gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Go back</span>
            </Button>
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center hover:bg-white/20 p-2 rounded-md"
            >
              <Home className="w-6 h-6" />
              <span className="sr-only">Home</span>
            </Link>
          </div>

          <div className="text-center">
            <span className="text-white text-2xl font-bold">Forktastic</span>
          </div>

          <Link
            to="/user-info"
            id="account-nav-button"
            className="text-white p-2 rounded-md hover:bg-white/20 flex items-center"
            title={loggedIn ? "Account" : "Sign In"}
          >
            <User className="w-5 h-5" />
            <span className="sr-only">{loggedIn ? "Account" : "Sign In"}</span>
          </Link>
        </div>
        {/* Search bar row */}
        <input
          type="search"
          placeholder="Search for a Recipe"
          className="w-full pl-8"
          onKeyDown={searchListener}
        />
        {/* Bottom row with navigation icons */}
        <div className="flex justify-center items-center w-full">
          <div className="flex items-center space-x-6">
            {pages.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                id={`nav-${page.href.replace("/", "")}-link`}
                className={`text-white p-2 rounded-md hover:bg-white/20 flex flex-col items-center ${
                  location.pathname === page.href ? "bg-white/20" : ""
                }`}
                title={page.name}
              >
                {getIconForPage(page.name)}
                <span className="text-xs mt-1">{page.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

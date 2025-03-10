import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import localStorageService from "@/utils_graphQL/localStorageService";
// import { Input } from "@/components/ui/input";
import {
  Home,
  ArrowLeft,
  BookOpen,
  Utensils,
  Search,
  Settings,
  BookPlus,
  CircleOff,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { page } from ".";

interface DesktopNavbarProps {
  pages: page[];
  loggedIn: boolean;
}

export default function DesktopNavbar({ pages }: DesktopNavbarProps) {
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
    switch (pageName) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "recipes":
        return <Utensils className="w-5 h-5" />;
      case "bookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "search":
        return <Search className="w-5 h-5" />;
      case "settings":
        return <Settings className="w-5 h-5" />;
      case "bookPlus":
        return <BookPlus className="w-5 h-5" />;
      case "userCog":
        return <UserCog className="w-5 h-5" />;
      default:
        return <CircleOff className="w-5 h-5" />;
    }
  };

  return (
    <>
      <nav
        id="desktop-navbar"
        className="fixed top-0 left-0 right-0 bg-[#ff9e40] p-4 shadow-md z-10 mx-auto flex flex-col"
      >
        <div id="title-row" className="text-center">
          <span className="text-white text-2xl font-bold">Forktastic</span>
        </div>

        <div
          id="icon-row"
          className="flex justify-center items-center w-full mb-2"
        >
          <Button
            id="back-button"
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-white hover:bg-white/20 mx-4"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>

          <input
            id="search-bar"
            type="search"
            placeholder="Search for a Recipe"
            className="pl-8 rounded-md mx-4"
            onKeyDown={searchListener}
          />

          {/* row of page links/icons */}
          {pages.map((page) => (
            <Link
              key={page.href}
              to={page.href}
              id={`nav-${page.href.replace("/", "")}-link`}
              className={`text-white p-2 rounded-md hover:bg-white/20 flex flex-col items-center mx-4 ${
                location.pathname === page.href ? "bg-white/20" : ""
              }`}
              title={page.name}
            >
              {getIconForPage(page.icon)}
              <span className="text-xs mt-1">{page.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      <div id="desktop-spacer" className="h-14"></div>
    </>
  );
}

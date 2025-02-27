import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, ChevronDown, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Auth from "../utils_graphQL/auth"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pages = [
        { name: "Search", path: "/search" },
        { name: "Recipe Book", path: "/recipe-book" },
        { name: "Recipe Maker", path: "/recipe-maker" },
      ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await Auth.loggedIn()
      setLoggedIn(status)
    }
    checkLoginStatus()

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#ff9e40] p-4 shadow-md z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="flex items-center gap-2 z-10">
          <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          <Link to="/" className="text-white text-2xl font-bold flex items-center hover:bg-white/20 p-2 rounded-md">
            <Home className="w-6 h-6" />
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <span className="text-white text-2xl font-bold">Forktastic</span>
        </div>
        <div className="flex items-center z-10">
          <div className="relative mr-4" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              id="toggle-dropdown-navbar"
              className="text-white flex items-center focus:outline-none"
            >
              {location.pathname === "/"
                ? "Home"
                : location.pathname.slice(1).replace(/-/g, " ")}
              <ChevronDown className="ml-1" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                {pages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    id={`dropdown-${page.path.replace("/", "")}-link`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/user-info"
            id="account-nav-button"
            className="text-white flex items-center focus:outline-none"
          >
            <User className="mr-2" />
            {loggedIn ? "Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar

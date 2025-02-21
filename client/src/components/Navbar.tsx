import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, ChevronDown, User } from "lucide-react"
import Auth from "../utils_graphQL/auth"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pages = loggedIn
    ? [
        { name: "Search", path: "/search" },
        { name: "Recipe Book", path: "/recipe-book" },
        { name: "Recipe Maker", path: "/recipe-maker" },
      ]
    : [{ name: "Search", path: "/search" }]

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await Auth.loggedIn()
      setLoggedIn(status)
    }
    checkLoginStatus()

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#ff9e40] p-4 shadow-md z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="flex items-center z-10">
          <Link to="/" className="text-white text-2xl font-bold flex items-center">
            <Home className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <span className="text-white text-2xl font-bold">Forktastic</span>
        </div>
        <div className="flex items-center z-10">
          <div className="relative mr-4" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="text-white flex items-center focus:outline-none">
              {location.pathname === "/" ? "Home" : location.pathname.slice(1).replace(/-/g, " ")}
              <ChevronDown className="ml-1" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                {pages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/user-info" className="text-white flex items-center focus:outline-none">
            <User className="mr-2" />
            {loggedIn ? "Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
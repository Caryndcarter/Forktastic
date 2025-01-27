import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const pageNames: { [key: string]: string } = {
  "/": "Home",
  "/recipe-book": "Recipe Book",
  "/recipe-search": "Recipe Search",
  "/recipe-maker": "Recipe Maker",
  "/user-info": "Account",
}

export function Navbar() {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState("Forktacular")

  useEffect(() => {
    setPageTitle(pageNames[location.pathname] || "Forktacular")
  }, [location])

  return (
    <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-10">
      <Link to="/" className="text-[#a84e24] hover:text-[#b7572e] font-semibold">
        Forktacular
      </Link>

      <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">{pageTitle}</div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-[#a84e24]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/recipe-book" className="w-full">
                Recipe Book
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/recipe-search" className="w-full">
                Search Page
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/recipe-maker" className="w-full">
                Recipe Maker
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/user-info" className="text-[#a84e24] hover:text-[#b7572e]">
          Account
        </Link>
      </div>
    </nav>
  )
}


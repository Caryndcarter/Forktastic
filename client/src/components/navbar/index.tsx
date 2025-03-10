import { useEffect } from "react";
import "./mediaQuery.css";
import "./DesktopNavbar";
import "./MobileNavbar";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import auth from "@/utils_graphQL/auth";

export interface page {
  name: string;
  href: string;
  icon: string;
}

// the search page is a special case and isn't included here
const pages: page[] = [
  {
    name: "Home",
    href: "/",
    icon: "home",
  },
  {
    name: "Recipe Book",
    href: "/recipe-book",
    icon: "bookOpen",
  },
  {
    name: "Recipe Maker",
    href: "/recipe-maker",
    icon: "bookPlus",
  },
  {
    name: "Account Settings",
    href: "/user-info",
    icon: "userCog",
  },
];

export default function Navbar() {
  let loggedIn = false;

  useEffect(() => {
    const status = auth.loggedIn();
    loggedIn = status;
  }, []);

  return (
    <>
      <MobileNavbar pages={pages} loggedIn={loggedIn} />
      <DesktopNavbar pages={pages} loggedIn={loggedIn} />
    </>
  );
}

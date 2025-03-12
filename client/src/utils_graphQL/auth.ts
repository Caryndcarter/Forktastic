// use this to decode a token and get the user's information out of it
import { jwtDecode } from "jwt-decode";
import { profile } from "../interfaces/index.js";

interface UserToken {
  name: string;
  exp: number;
}

// create a new class to instantiate for a user
class AuthService {
  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // get user data
  getProfile() {
    const payLoad: any = jwtDecode(this.getToken() || "");
    return payLoad?.data as profile;
  }

  // check if user's logged in
  loggedIn() {
    try {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken();
      if (!token) {
        return false;
      }

      if (this.isTokenExpired(token)) {
        localStorage.removeItem("id_token");
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");

    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();

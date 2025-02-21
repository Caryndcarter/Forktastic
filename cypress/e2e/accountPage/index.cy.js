import runLogInTest from "./logIn.cy";
import runPreferencesTest from "./preferences.cy";
import runSignUpTest from "./signUp.cy";

export default function accountPageTests() {
  runLogInTest();
  runPreferencesTest();
  runSignUpTest();
}

accountPageTests();

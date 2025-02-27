import accountPageTests from "./accountPage/index.cy.js";
import homePageTests from "./homePage/index.cy.js";
import searchPageTests from "./searchPage/index.cy.js";
import showcasePageTests from "./showcasePage/index.cy.js";

const runAllTests = () => {
  accountPageTests();
  homePageTests();
  searchPageTests();
  showcasePageTests();
};

runAllTests();

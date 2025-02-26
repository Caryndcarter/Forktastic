import credentials from "../testingAssets/accountCredentials";

export default function runSavingTests() {
  describe("Recipe Book Component", () => {
    beforeEach(() => {
      // go to the account page:
      cy.visit("/");
      cy.get("#account-nav-button").click();

      // login
      cy.get("#userEmail").type(credentials.testingAccount.email);
      cy.get("#userPassword").type(credentials.testingAccount.password);
      cy.get("#sign-in-submit").click();

      // check that the login suceeded (home page)
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/");
      });
    });

    it("displays recipe book title", () => {
      // go to the recipebookPage
      cy.get("#toggle-dropdown-navbar").click();
      cy.get("#dropdown-recipe-book-link").click();

      // check the title
      cy.get("h1.text-4xl").should("contain", "My Recipe Book");
    });

    it("save a recipe book", () => {
      // find the first recipe on the search page:
      cy.get("#sample-recipies button").first().click();
    });
  });
}

runSavingTests();

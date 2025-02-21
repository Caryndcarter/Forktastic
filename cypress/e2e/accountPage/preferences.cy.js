import credentials from "../testingAssets/accountCredentials";

export default function runPreferencesTest() {
  describe("account preferences work as expected", () => {
    it("saves your diet preference", () => {
      // go to the account page:
      cy.visit("/");
      cy.get("#account-nav-button").click();

      // login using true credentials
      cy.get("#userEmail").type(credentials.testingAccount.email);
      cy.get("#userPassword").type(credentials.testingAccount.password);
      cy.get("#sign-in-submit").click();

      // wait for logIn to finish
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/");
      });

      // go back to the account page and update diet:
      cy.get("#account-nav-button").click();
      cy.get("#diet-select").select("Ketogenic");
      cy.get("#update-preferences-button").click();

      // wait for the account update to finish
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/");
      });
    });
  });
}

runPreferencesTest();

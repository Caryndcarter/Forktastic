import { foodQueryResults } from "./expectedSearchResults";

export function runBasicSearches() {
  describe("Filter tests", () => {
    it("updates the search to reflect vegetarian filter", () => {
      // go to the search page
      cy.visit("/");
      cy.get("#toggle-dropdown-navbar").click();
      cy.get("#dropdown-search-link").click();

      // type "food" into the search field:
      cy.get("#search-input").type("food");

      // verify search results:
      cy.get("#search-results h2").each(($element, index) => {
        // wrap elements so commands can be chained
        cy.wrap($element).should("have.text", foodQueryResults[index]);
      });
    });
  });
}

runBasicSearches();

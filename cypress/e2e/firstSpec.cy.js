const PORT = 3005; // ensure this port is correct for your testing

describe("Starter test file", () => {
  it("visits the page", () => {
    cy.visit(`http://localhost:${PORT}`);
    console.log(PORT);
  });
});

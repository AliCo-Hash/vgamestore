describe("footer", () => {
  it("should navigate to the about us page", () => {
    cy.visit("/");
    cy.get("a[href*=about]").click();
    cy.url().should("include", "/about");
    cy.contains("Populate with about us stuff");
  });
});

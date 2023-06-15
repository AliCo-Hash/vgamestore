describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the cart page", () => {
    cy.get("a[href*=cart]").click();
    cy.url().should("include", "/cart");
  });

  it("should navigate to the sign in page", () => {
    cy.get("a[href*=signin]").click();
    cy.url().should("include", "/signin");
  });
});

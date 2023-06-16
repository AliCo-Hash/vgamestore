describe("Navbar", () => {
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

  it("should have a dropdown menu with correct options", () => {
    cy.visit("/signin");
    const name = Cypress.env("name");
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button").contains("Login").click();

    cy.contains(name).click();
    cy.contains("Profile");
    cy.contains("Order History");
    cy.contains("Logout");
  });
});

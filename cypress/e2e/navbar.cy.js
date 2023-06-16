const loginAndOpenMenu = () => {
  cy.visit("/signin");
  cy.get('input[name="email"]').type(Cypress.env("email"));
  cy.get('input[name="password"]').type(Cypress.env("password"));
  cy.get("button").contains("Login").click();
  cy.contains(Cypress.env("name")).click();
};

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
    loginAndOpenMenu();

    cy.contains("Profile");
    cy.contains("Order History");
    cy.contains("Logout");
  });

  it("should navigate to the profile page", () => {
    loginAndOpenMenu();

    cy.contains("Profile").click();
    cy.url({ timeout: 5000 }).should("eq", "http://localhost:3000/profile");
  });

  it("should navigate to the order history page", () => {
    loginAndOpenMenu();

    cy.contains("Order History").click();
    cy.url({ timeout: 5000 }).should(
      "eq",
      "http://localhost:3000/order-history"
    );
  });
});

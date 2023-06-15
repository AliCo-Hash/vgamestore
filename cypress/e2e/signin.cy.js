describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("should display the sign in form", () => {
    cy.get("form").should("exist");
    cy.get("h1").contains("Login");
    cy.get("label[for=email]").contains("Email");
    cy.get("label[for=password]").contains("Password");
    cy.get("button").contains("Login");
    cy.get("div").contains("don't have an account?");
    cy.get("a[href*=register]").contains("Register");
  });

  it("should display error messages for invalid form submission", () => {
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Please enter email");
    cy.get("span").contains("Please enter password");
  });
});

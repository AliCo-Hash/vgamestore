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

  it("should display error messages for missing form submission", () => {
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Please enter email");
    cy.get("span").contains("Please enter password");
  });

  it("should display incorrect email message error message", () => {
    cy.get('input[name="email"]').then(input => {
      input.val("invalidemail");
      input.trigger("input");
    });
    cy.get('input[name="password"]').type("password");

    cy.get("form").submit();
    cy.get("span").contains("Please enter a valid email");
  });

  it("should display min password length error message", () => {
    cy.get('input[name="password"]').then(input => {
      input.val("pass");
      input.trigger("input");
    });
    cy.get('input[name="email"]').type("user@user.com");

    cy.get("form").submit();
    cy.get("span").contains("Password must be 8 or more characters long");
  });

  it("should log in with correct credentials and redirect to home page", () => {
    const name = Cypress.env("name");
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button").contains("Login").click();

    cy.url({ timeout: 5000 }).should("eq", "http://localhost:3000/");
    cy.contains(name);
  });
});

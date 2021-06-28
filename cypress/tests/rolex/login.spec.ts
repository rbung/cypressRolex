describe("User Sign-up and Login", function () {
  it("should redirect unauthenticated user to signin page", function () {
    cy.visit("/personal");
    cy.location("pathname").should("equal", "/signin");
  });

  it("should redirect to the home page after login", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret{enter}");

    cy.location("pathname").should("equal", "/");
  });

  it("should display login errors", function () {
    cy.visit("/signin");

    cy.get("[data-test=signin-username").type("User").find("input").clear().blur();
    cy.get("#username-helper-text").should("be.visible").and("contain", "Username is required");

    cy.get("[data-test=signin-password").type("abc").find("input").blur();
    cy.get("#password-helper-text")
      .should("be.visible")
      .and("contain", "Password must contain at least 4 characters");

    cy.get("[data-test=signin-submit").should("be.disabled");
  });

  it("should error for an invalid user", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("invalidUserName");
    cy.get("#password").type("invalidPa$$word{enter}");

    cy.get("[data-test=signin-error")
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });

  it("should error for an invalid password for existing user", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("INVALID{enter}");

    cy.get("[data-test=signin-error")
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });
});

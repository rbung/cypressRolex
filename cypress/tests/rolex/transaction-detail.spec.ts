describe("transaction details", function () {
  beforeEach(function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret{enter}");
    cy.location("pathname").should("equal", "/");

    // TODO 1: maybe use a custom command ?
    // TODO 2: take a shortcut ?
  });

  it("should display the transaction (from DB)", function () {
    cy.visit("/transaction/183VHWyuQMS");
    cy.get("[data-test=transaction-detail-header]").should("be.visible");
    cy.get("[data-test=transaction-sender-avatar]").should("be.visible");
    cy.get("[data-test=transaction-receiver-avatar]").should("be.visible");
    cy.get("[data-test=transaction-sender-183VHWyuQMS]").should("contain.text", "Kaylin Homenick");
    cy.get("[data-test=transaction-action-183VHWyuQMS]").should("contain.text", "paid");
    cy.get("[data-test=transaction-receiver-183VHWyuQMS]").should(
      "contain.text",
      "Arely Kertzmann"
    );
    cy.get("[data-test=transaction-description]").should(
      "contain.text",
      "Payment: bDjUb4ir5O to qywYp6hS0U"
    );
    cy.get("[data-test=transaction-amount-183VHWyuQMS]").should("contain.text", "-$80.31");
  });

  it("should display the transaction (from intercept)", function () {
    cy.intercept("/transactions/*", { fixture: "transaction.json" }).as("getTransaction");
    cy.intercept("/notifications", { fixture: "notifications.json" }).as("getNotifications");
    cy.visit("/transaction/183VHWyuQMS");
    cy.wait("@getTransaction");
    cy.get("[data-test=transaction-detail-header]").should("be.visible");
    cy.get("[data-test=transaction-sender-avatar]").should("be.visible");
    cy.get("[data-test=transaction-receiver-avatar]").should("be.visible");
    cy.get("[data-test=transaction-sender-MyTransaction1234]").should("contain.text", "Rodolphe");
    cy.get("[data-test=transaction-action-MyTransaction1234]").should("contain.text", "paid");
    cy.get("[data-test=transaction-receiver-MyTransaction1234]").should("contain.text", "John Doe");
    cy.get("[data-test=transaction-description]").should("contain.text", "My awesome payment");
    cy.get("[data-test=transaction-amount-MyTransaction1234]").should("contain.text", "-$42.00");
  });

  it("should display nothing with an error on transaction request", function () {
    cy.intercept("/transactions/*", { statusCode: 500 }).as("getTransaction");
    cy.visit("/transaction/183VHWyuQMS");
    cy.wait("@getTransaction");
    cy.get("[data-test=transaction-detail-header]").should("not.exist");
  });

  it.skip("should deal with a long transaction request", function () {
    cy.intercept("/transactions/*", { delay: 5000 }).as("getTransaction");
    cy.visit("/transaction/183VHWyuQMS");
    cy.wait("@getTransaction");
    cy.get("[data-test=transaction-detail-header]").should("not.exist");
  });
});

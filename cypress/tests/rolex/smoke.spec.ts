describe("smoke tests", () => {
  it("should pass all the steps", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret{enter}");

    cy.location("pathname").should("eq", "/");
    cy.get("[data-test=sidenav-home] ").should("be.visible");
    cy.get("[data-test=sidenav-user-settings] ").should("be.visible");
    cy.get("[data-test=sidenav-bankaccounts] ").should("be.visible");
    cy.get("[data-test=sidenav-notifications]").should("be.visible");
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    cy.get("[data-test=nav-contacts-tab]").click();
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    cy.get("[data-test=nav-personal-tab]").click();
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    cy.get("[data-test=sidenav-user-settings] ").click();
    cy.get("[data-test=user-settings-firstName-input]").should("have.value", "Edgar");
    cy.get("[data-test=user-settings-lastName-input]").should("have.value", "Johns");
    cy.get("[data-test=user-settings-email-input]").should("have.value", "Norene39@yahoo.com");
    cy.get("[data-test=user-settings-phoneNumber-input]").should("have.value", "625-316-9882");

    cy.get("[data-test=sidenav-signout]").click();
    cy.location("pathname").should("eq", "/signin");
  });
});

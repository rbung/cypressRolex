describe("User Settings", function () {
  it("renders the user settings form", function () {
    cy.loginByXstate("Katharina_Bernier", "s3cret");
    cy.visit("/user/settings");
    cy.getBySel("user-settings-form").should("be.visible");
    cy.location("pathname").should("include", "/user/settings");
  });
});

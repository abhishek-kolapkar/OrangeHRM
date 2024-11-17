// custom commands
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.visit("/");
  cy.get("input[name='username']").clear().type(username);
  cy.get("input[name='password']").clear().type(password);

  cy.get(".orangehrm-login-button").click();
  cy.get(".oxd-topbar-header-breadcrumb-module").should("contain", "Dashboard");
});

Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown").click();
  cy.get(".oxd-dropdown-menu li:nth-child(4) > a").contains("Logout").click();
});

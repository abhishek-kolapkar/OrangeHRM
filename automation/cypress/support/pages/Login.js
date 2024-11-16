export class Login {
  // locators
  usernameField = () => cy.get("input[name='username']");
  passwordField = () => cy.get("input[name='password']");
  submitButton = () => cy.get(".orangehrm-login-button");
  alertLoginError = () => cy.get(".oxd-alert-content-text");
  dashboardLabel = () => cy.get(".oxd-topbar-header-breadcrumb-module");

  // action methods
  /* => Login */
  login(username, password) {
    username && this.usernameField().clear().type(username);
    password && this.passwordField().clear().type(password);

    this.submitButton().click();
  }

  // assertion methods
  verifyLoginSuccess(label) {
    this.dashboardLabel().should("contain", label);
  }

  verifyInvalidLogin(errorMsg) {
    this.alertLoginError().should("contain", errorMsg);
  }

  verifyEmptyUsername(errorMsg) {
    this.usernameField()
      .parents()
      .eq(1)
      .contains("span", errorMsg)
      .should("exist");
  }

  verifyEmptyPassword(errorMsg) {
    this.passwordField()
      .parents()
      .eq(1)
      .contains("span", errorMsg)
      .should("exist");
  }
}
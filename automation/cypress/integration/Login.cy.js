import { Login } from "../support/pages/Login";
import { Logout } from "../support/pages/Logout";

const loginActions = new Login();
const logoutActions = new Logout();

describe("Verify login functionality", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("login.json").as("loginInfo");
  });

  it("Verify login with valid credentials & redirect to dashboard", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login(data.validUsername, data.validPassword);

      // verify user redirect to Dashboard page
      loginActions.verifyLoginSuccess("Dashboard");

      cy.wait(5000);

      // if user logged in, then logout after 5s wait
      logoutActions.logout();
      logoutActions.verifyLogoutSuccess();
    });
  });

  it("Verify login with valid username & invalid password", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login(data.validUsername, data.invalidPassword);

      // verify error msg
      loginActions.alertLoginError(data.invalidLoginMsg);
    });
  });

  it("Verify login with invalid username & valid password", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login(data.invalidUsername, data.validPassword);

      // verify error msg
      loginActions.alertLoginError(data.invalidLoginMsg);
    });
  });

  it("Verify login if blank username & valid password", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login("", data.validPassword);

      // verify error msg
      loginActions.verifyEmptyUsername(data.requiredFieldMsg);
    });
  });

  it("Verify login if valid username & blank password", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login(data.validUsername, "");

      // verify error msg
      loginActions.verifyEmptyPassword(data.requiredFieldMsg);
    });
  });

  it("Verify login if blank username & blank password", () => {
    cy.get("@loginInfo").then((data) => {
      loginActions.login("", "");

      // verify error msg
      loginActions.verifyEmptyUsername(data.requiredFieldMsg);
      loginActions.verifyEmptyPassword(data.requiredFieldMsg);
    });
  });

  // bug
  it("Verify that username is case sensitive", () => {
    cy.get("@loginInfo").then((data) => {
      if (data.validUsername == data.validUsername.toUpperCase()) {
        loginActions.login(
          data.validUsername.toLowerCase(),
          data.validPassword
        );
      } else {
        loginActions.login(
          data.validUsername.toUpperCase(),
          data.validPassword
        );
      }

      loginActions.verifyLoginSuccess("Dashboard");

      cy.wait(5000);

      // if user logged in, then logout after 5s wait
      logoutActions.logout();
      logoutActions.verifyLogoutSuccess();
    });
  });

  it("Verify that password is case sensitive", () => {
    cy.get("@loginInfo").then((data) => {
      if (data.validPassword == data.validPassword.toUpperCase()) {
        loginActions.login(
          data.validUsername,
          data.validPassword.toLowerCase()
        );
      } else {
        loginActions.login(
          data.validUsername,
          data.validPassword.toUpperCase()
        );
      }

      loginActions.verifyInvalidLogin(data.invalidLoginMsg);
    });
  });
});

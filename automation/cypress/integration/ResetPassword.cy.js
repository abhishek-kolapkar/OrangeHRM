import { ResetPassword } from "../support/pages/ResetPassword";

const resetPasswordActions = new ResetPassword();

describe("Password reset link is sent to the registered email", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verify that entering a valid username triggers the password reset link", () => {
    cy.fixture("login.json").then((data) => {
      resetPasswordActions.clickForgotPassLink()
      resetPasswordActions.forgotYourPassword(data.validUsername);

      resetPasswordActions.resetPassSuccess();
    });
  });

  // bug
  it("Verify that entering a invalid username triggers the password reset link", () => {
    cy.fixture("login.json").then((data) => {
      resetPasswordActions.clickForgotPassLink()
      resetPasswordActions.forgotYourPassword(data.invalidUsername);

      resetPasswordActions.resetPassSuccess();
    });
  });

  it("Verify that blank username triggers the password reset link", () => {
    cy.fixture("login.json").then((data) => {
      resetPasswordActions.clickForgotPassLink()
      resetPasswordActions.forgotYourPassword(" ");

      resetPasswordActions.verifyEmptyUsername(data.requiredFieldMsg);
    });
  });
});

describe("Cancel button behavior", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verify that clicking the Cancel button navigates back to the Login page.", () => {
    resetPasswordActions.clickForgotPassLink()
    resetPasswordActions.cancelResetPass();

    resetPasswordActions.checkCancelResetPass();
  });

  it("Verify that entering a valid username & clicking the Cancel button does not submit the form", () => {
    cy.fixture("login.json").then((data) => {
      resetPasswordActions.clickForgotPassLink()
      resetPasswordActions.cancelResetPassUsername(data.validUsername);

      resetPasswordActions.resetPassSuccess();
    });
  });
});

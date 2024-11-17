import { Buzz } from "../../support/pages/Buzz";

const buzzActions = new Buzz();

describe("Add post", () => {
  beforeEach(() => {
    cy.login();

    buzzActions.openBuzzTab();

    cy.fixture("buzz.json").as("buzzData");
  });

  it("should be able to add a post", () => {
    cy.get("@buzzData").then((post) => {
      buzzActions.addNewPost(post.content);

      buzzActions.verifyNewPostCreated(post.content);
    });
  });
});

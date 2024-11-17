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

  afterEach(() => {
    cy.logout();
  });
});

describe("Like post", () => {
  beforeEach(() => {
    cy.login();

    buzzActions.openBuzzTab();
  });

  it("should like a post and verify the like count increases by 1", () => {});

  afterEach(() => {
    cy.logout();
  });
});

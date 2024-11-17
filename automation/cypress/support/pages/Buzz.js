import { Helper } from "../helper";

export class Buzz {
  postInputField = () => cy.get(".oxd-buzz-post-input");
  postSubmitBtn = () => cy.get("button[type='submit']").contains("Post");

  posts = () => cy.get(".oxd-sheet");

  // action methods
  openBuzzTab() {
    Helper.menuTab().contains("Buzz").click();
  }

  addNewPost(postData) {
    this.postInputField().clear().type(postData);
    this.postSubmitBtn().click();
  }

  getTotalPostCount() {
    this.posts().its(length);
  }

  // assertion methods
  verifyNewPostCreated(postContent) {
    this.posts().eq(1).should("contain", postContent);
  }
}

describe("SidePanel Search functionality", () => {
  beforeEach(() => {
    // login into system
    cy.login();

    cy.fixture("sidePanel.json").as("menuData");
  });

  it("should filter the side panel menu based on a search input", () => {
    cy.get("@menuData").then((menuItems) => {
      // get a random index to pick a random menu item from the list
      const index = Math.floor(Math.random() * menuItems.length);
      const keyword = menuItems[index];

      // enter the keyword into the search input
      cy.get(".oxd-main-menu-search > input[placeholder='Search']")
        .clear()
        .type(keyword);

      // verify if the menu items containing the keyword are visible
      menuItems.forEach((menuItem) => {
        if (menuItem.includes(keyword)) {
          // If the menu item contains the keyword, it should be visible
          cy.get(".oxd-main-menu-item").contains(menuItem).should("be.visible");
        } else {
          // If the menu item does not contain the keyword, it should not be visible
          cy.get(".oxd-main-menu-item").contains(menuItem).should("not.exist");
        }
      });
    });
  });

  it("should handle invalid search keywords and hide all items", () => {
    // Generate a random invalid keyword that is not in the menu list
    const invalidKeyword = "InvalidMenuItem";

    // Enter the invalid keyword into the search input
    cy.get(".oxd-main-menu-search > input[placeholder='Search']")
      .clear()
      .type(invalidKeyword);

    // Loop through all menu items and ensure they are all hidden
    cy.get("@menuData").then((menuItems) => {
      menuItems.forEach((menuItem) => {
        cy.get("ul.oxd-main-menu").contains(menuItem).should("not.exist");
      });
    });
  });

  it("should clear the search filter when input is cleared", () => {
    // Clear the search input
    cy.get(".oxd-main-menu-search > input[placeholder='Search']").clear();

    // Loop through all menu items and ensure they are all visible again
    cy.get("@menuData").then((menuItems) => {
      menuItems.forEach((menuItem) => {
        cy.get("ul.oxd-main-menu").contains(menuItem).should("be.visible");
      });
    });
  });

  afterEach(() => {
    cy.logout();
  });
});

# OrangeHRM Automation with Cypress

This repository contains automated tests for the OrangeHRM application using Cypress. The aim is to ensure the functionality and stability of the application through automated testing.

## Introduction

OrangeHRM is a leading open-source human resource management software. This project automates various functionalities of the OrangeHRM application to ensure smooth user experiences and minimize regression issues.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or later)
- npm (Node package manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhishek-kolapkar/OrangeHRM.git
   cd automation
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

## Running Tests

To run the tests, use the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner. From there, you can select the test files you want to run.

For headless execution, you can run:

```bash
npx cypress run
```

## Folder Structure

The project follows a standard Cypress folder structure:

```
automation/
├── cypress/
│   ├── integration/            # spec folder
|       ├──module/
|          ├── login.cy.js      # Spec file which contains test case
|
│   ├── fixtures/               # Test data
|       ├── module/
|           ├── testData.json   # File which contatins web elements and credentials
|
│   ├── support/                # Custom commands and global configurations
|       ├── page-objects/
|       |   ├── page.js
|       |
|       ├── commands.js
|       ├── e2e.js
|       ├── helper.js
|
├── cypress.json                # Cypress configuration file
└── package.json                # Project dependencies and scripts
└── README.md                   # Documentation
```

## Custom Commands

Custom commands are defined in the `cypress/support/commands.js` file. They help to streamline repetitive tasks within tests.

## Test Cases Covered

- Title of the website should be **OrangeHRM**.
- Logging in with correct and incorrect credentials.
- **Forgot password** functionality.
- URL of the **left panel** works correctly.
- All **core functionalities** work correctly.

import { faker } from "@faker-js/faker";

describe("Exception Handling and View Ports", () => {

    const invalidLoginUrl = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login/1";
    const validLoginUrl = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
    const email = faker.internet.email();
    const password = faker.internet.password();

    beforeEach(() => {

        Cypress.on("fail", (err, runnable) => {

            cy.log("failure " + err)
            cy.log("runnable " + runnable)
            cy.log("Failure message " + err.message)

            return false;
        })

        cy.on("uncaught:exception", (err, runnable) => {

            cy.log("uncaught:exception " + err)
            cy.log("runnable " + runnable)
            cy.log("Error message " + err.message)

            return false;
        })
    })

    it("Handling fail on status code exception", () => {

        cy.visit(invalidLoginUrl, { failOnStatusCode: false })
    })

    it("Handling test failure exceptions/uncaught:exceptions", () => {

        cy.visit(validLoginUrl)
        cy.get('[id="input-email"]').type(email);
        cy.get('[id="input-password"]').type(password);
        cy.get('[value="Login"]').click();
        cy.get(".error-message").should("be.visible");

    })

    it("Using ViewPort method to adjust the pixel resolution", () => {

        cy.viewport("samsung-s10").then(() => {

            cy.visit(validLoginUrl)
            cy.get('[id="input-email"]').type(email);
            cy.get('[id="input-password"]').type(password);
            cy.get('[value="Login"]').click();

       })
    })
})
import loginTestData from '../../fixtures/loginTestData.json'

Cypress.Commands.add("Login", () => {


    cy.visit('/login');
    cy.get("div.login-form > h2").should("be.visible").then(() => {

        cy.intercept("POST", "/login").as("loginCall");

        cy.get('[data-qa="login-email"]').type(loginTestData.loginEmailID);
        cy.get('[data-qa="login-password"]').type(loginTestData.password);
        cy.get('[data-qa="login-button"]').click();

        cy.wait('@loginCall');
    })


})

Cypress.Commands.add("LoginUsingPara", (email, pass) => {


    cy.visit('/login');
    cy.get("div.login-form > h2").should("be.visible").then(() => {

        cy.intercept("POST", "/login").as("loginCall");

        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(pass);
        cy.get('[data-qa="login-button"]').click();

        cy.wait('@loginCall');
    })


})

Cypress.Commands.add("loginUsingInValidCredentials", (email, pass) => {
 
    try {
 
        cy.visit('/login');
 
        cy.get("div.login-form > h2").should("be.visible").then(() => {
 
            cy.intercept("POST", "/login").as("loginCall");
 
            cy.get('[data-qa="login-email"]').type(email);
            cy.get('[data-qa="login-password"]').type(pass);
            cy.get('[data-qa="login-button"]').click();
 
            //cy.wait('@loginCall').its("response.statusCode").should('eq', 200);
 
            cy.get("div.login-form > h2").should("not.be.visible")
        })
 
    } catch (error) {
 
        cy.log("The test is failed and the error message is :" + error)
 
    }
 
 
 
 
})

Cypress.Commands.add("LoginUsingSession", (email, pass) => {

    cy.session(([email, pass]), () => {

        cy.visit('/login');
        cy.get("div.login-form > h2").should("be.visible").then(() => {

            cy.intercept("POST", "/login").as("loginCall");

            cy.get('[data-qa="login-email"]').type(email);
            cy.get('[data-qa="login-password"]').type(pass);
            cy.get('[data-qa="login-button"]').click();

            cy.wait('@loginCall');
        })

    },

        {

            cacheAcrossSpecs: true
        }


    )


})



Cypress.Commands.add("LoginUsingFixtures", () => {

    cy.visit('/login');

    cy.fixture("../../fixtures/loginTestData.json").then(() => {

        cy.get("div.login-form > h2").should("be.visible").then(() => {
            cy.intercept("POST", "/login").as("loginCall");

            cy.get('[data-qa="login-email"]').type(loginTestData["loginValidCredentials"]["validUserName"]);
            cy.get('[data-qa="login-password"]').type(loginTestData["loginValidCredentials"]["validPassword"]);
            cy.get('[data-qa="login-button"]').click();

            cy.wait('@loginCall');


        })

    })

})



Cypress.Commands.add("SwagLabUrl", () => {

    cy.visit("https://www.saucedemo.com/v1/inventory.html");

})


Cypress.Commands.add("Logout", () => {

    cy.intercept("GET", "/logout").as("logoutCall");

    //Perform Log-out and check Log-out button is not visible
    cy.get('a[href="/logout"]').click();

    cy.wait("@logoutCall");

    cy.get('a[href="/login"]').should("be.visible");

})


Cypress.Commands.add("DeleteAccount", () => {

    let accountDelText = "Your account has been permanently deleted!";
    let accountDelTitle = "Account Deleted!";

    cy.get('a[href="/delete_account"]').click();

    //Verify 'Account Deleted' message is displayed successfully
    cy.get('h2> b').should("have.text", accountDelTitle);
    cy.get('div.col-sm-9.col-sm-offset-1 p:first-of-type').should("have.text", accountDelText);

})


Cypress.Commands.add('getiFrame', (iframeSelector) => {
    cy.get(iframeSelector)
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap);
});



Cypress.Commands.add('shadowMethod', (shadowBody) => {


    cy.get(shadowBody).shadow().then(($shadowId) => {

        return cy.wrap($shadowId)

    })

})
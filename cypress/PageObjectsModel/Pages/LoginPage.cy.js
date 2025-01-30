import LoginTestData from "../../../fixtures/loginAddProductCheckoutTestData.json";


class LoginPage {

    constructor() {

        this.uName = "#user-name";
        this.pass = "#password";
        this.loginBtn = "#login-button";
    }

    launchUrl() {
        cy.visit(LoginTestData.url);
        cy.url().should("include", "www.saucedemo.com/v1/");
    }

    loginUser() {

        cy.session(([LoginTestData.userName, LoginTestData.password, LoginTestData.url]), () => {

            this.launchUrl(LoginTestData.url)

            cy.get(this.uName).as("userNameField").clear().type(LoginTestData.userName);
            cy.get("@userNameField").should("have.value", LoginTestData.userName);

            cy.get(this.pass).as("passwordField").clear().type(LoginTestData.password);
            cy.get("@passwordField").should("have.value", LoginTestData.password);
            cy.get(this.loginBtn).should("be.visible").click();

        },
            {
                cacheAcrossSpecs: true
            })
    }
}

export default LoginPage;
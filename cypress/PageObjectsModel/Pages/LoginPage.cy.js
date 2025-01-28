class LoginPage {

    constructor() {

        this.uName = "#user-name";
        this.pass = "#password";
        this.loginBtn = "#login-button";
    }

    launchUrl(url) {
        cy.visit(url);
        cy.url().should("include", "www.saucedemo.com/v1/");
    }

    loginUser(userName, password, url) {

        cy.session(([userName, password, url]), () => {

            this.launchUrl(url)

            cy.get(this.uName).as("userNameField").clear().type(userName);
            cy.get("@userNameField").should("have.value", userName);

            cy.get(this.pass).as("passwordField").clear().type(password);
            cy.get("@passwordField").should("have.value", password);
            cy.get(this.loginBtn).should("be.visible").click();

        },
            {
                cacheAcrossSpecs: true
            })
    }
}

export default LoginPage;
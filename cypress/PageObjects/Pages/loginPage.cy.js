class Login {

    constructor() {

        this.uName = '[data-qa="login-email"]';
        this.pwd = '[data-qa="login-password"]';
        this.submitBtn = '[data-qa="login-button"]';
        this.invalidMsg = 'form[action="/login"] > p';
        this.invalidLoginMessage = "Your email or password is incorrect!";
    }

    navigateToLoginUrl() {

        cy.visit("/login")

    }

    setUserName(email) {

        cy.get(this.uName).click().clear().type(email)

    }
    setUserPassword(password) {

        cy.get(this.pwd).click().clear().type(password);

    }

    clickSubmit() {

        cy.get(this.submitBtn).should("be.visible").invoke("text").then(($submitBtnText) => {
            expect($submitBtnText).equals("Login")
    
        })
        cy.get(this.submitBtn).click()
    }

    validateUsername(email) {
        cy.get(this.uName)
            .should('be.visible')
            .should('have.value', email)
    }

    validatePassword(password) {
        cy.get(this.pwd)
            .should('be.visible')
            .should('have.value', password)
    }

    submit() {
        cy.get(this.submitBtn)
            .should('be.visible')
            .should('have.text', 'Login')
    }

    validateInvalidLoginCredentials() {

        cy.get(this.invalidMsg).should("have.text", this.invalidLoginMessage)

    }

    validateValidLoginCredentials() {

        cy.get(this.invalidMsg).should("not.have.text", this.invalidLoginMessage)

    }

}

export default Login;
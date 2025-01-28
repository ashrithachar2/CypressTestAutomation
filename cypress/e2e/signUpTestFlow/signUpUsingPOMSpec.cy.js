import Login from "../../PageObjects/Pages/loginPage.cy"

describe("Implementing login test using POM model", () => {


    beforeEach(function () {

        cy.fixture("../../fixtures/loginTestData.json").then(function (loginTestData) {

            this.loginTestData = loginTestData;

        })

        login.navigateToLoginUrl()

    })

    const login = new Login();


    it("Launching Url", () => {


    })

    it("Enter login user name", function () {

        login.setUserName(this.loginTestData.loginEmailID)
        login.validateUsername(this.loginTestData.loginEmailID)

    })

    it("Enter login password", function () {

        login.setUserPassword(this.loginTestData.password)
        login.validatePassword(this.loginTestData.password)

    })


    it("Validate page url", () => {

        cy.url().should("include", "/login")

    })

    it("Cick on submit", () => {

        login.clickSubmit()
        login.submit();

    })


    it("Login using valid credentials", function () {

        login.setUserName(this.loginTestData["loginValidCredentials"]["validUserName"])
        login.validateUsername(this.loginTestData["loginValidCredentials"]["validUserName"])
        login.setUserPassword(this.loginTestData["loginValidCredentials"]["validPassword"])
        login.validatePassword(this.loginTestData["loginValidCredentials"]["validPassword"])
        login.clickSubmit()

    })


    it("Login using invalid credentials", function () {

        login.setUserName(this.loginTestData["loginInvalidCredentials"]["inValidUserName"])
        login.validateUsername(this.loginTestData["loginInvalidCredentials"]["inValidUserName"])
        login.setUserPassword(this.loginTestData["loginInvalidCredentials"]["inValidPassword"])
        login.validatePassword(this.loginTestData["loginInvalidCredentials"]["inValidPassword"])
        login.clickSubmit()
        login.validateInvalidLoginCredentials()

    })

    it("Click login submit button using keyboard keys", function () {

        login.setUserName(this.loginTestData["loginValidCredentials"]["validUserName"])
        login.validateUsername(this.loginTestData["loginValidCredentials"]["validUserName"])
        login.setUserPassword(this.loginTestData["loginValidCredentials"]["validPassword"] + "{enter}")

    })


})
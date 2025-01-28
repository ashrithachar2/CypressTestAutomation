import { addItemsToCartAndCheckOutAfterLoginThenPlaceOrder, enterCardDetails } from "../support/addItemsToCartAndCheckOut"

describe("Assignment_Jan_23", () => {

    beforeEach(() => {

        cy.fixture("../../fixtures/signUpDetails.json").then(function (signUpTestData) {
            this.signUpTestData = signUpTestData;
        })

        cy.fixture("../../fixtures/searchProduct.json").then(function (searchProductTestData) {
            this.searchProductTestData = searchProductTestData;
        })

        cy.fixture("../../fixtures/cardDetails.json").then(function (cardDetails) {
            this.cardDetails = cardDetails;
        })

        /*Cypress.on("fail", (err, runnable) => {

            cy.log("Failure is :" + err)
            cy.log("Runnable " + runnable)
            cy.log("Failure message " + err.message)

        })  */
    })

    it("Sign up and create new account", function () {

        //Navigating to Url
        cy.visit('/');
        cy.get('.features_items > .title').contains('Features Items');

        //Click on Sign Up Button
        cy.get('a[href="/login"]').click();

        //Enter values in New User SignUp and Submit
        cy.get('input[data-qa="signup-name"]').type(this.signUpTestData.name);
        cy.get('input[data-qa="signup-email"]').type(Math.floor(Math.random() * 700) + this.signUpTestData.signUpEmailID);
        cy.get('[data-qa="signup-button"]').click();

        //Verify the title
        cy.get('.login-form > h2 > b').then((actualTitle) => {
            expect(actualTitle.text()).to.contain(this.signUpTestData.expectedTitle);
        });

        //Perform the operations
        cy.get('#id_gender1').click();

        //Validation to check name field is correctly fetched the value
        cy.get('#name.form-control').should('have.attr', 'value', this.signUpTestData.name);

        //Validation to check email field is diabled and correctly fetched the value
        cy.get('#email').should("be.disabled");
        //cy.get('#email').should('have.attr', 'value', Math.floor(Math.random()*700+this.signUpTestData.emailID));

        cy.get('#password').type(this.signUpTestData.password);
        cy.get('#days').select(this.signUpTestData.date);
        cy.get('#months').select(this.signUpTestData.month);
        cy.get('#years').select(this.signUpTestData.year);
        cy.get('#newsletter').check();
        cy.get('#optin').check();
        cy.get('p input[data-qa="first_name"].form-control').type(this.signUpTestData.firstName);
        cy.get('p input[data-qa="last_name"].form-control').type(this.signUpTestData.lastName);
        cy.get('p :nth-child(2)#company').type(this.signUpTestData.company);
        cy.get('#address1').type(this.signUpTestData.address);
        cy.get('#country').select(0);
        cy.get('#state').type(this.signUpTestData.state);
        cy.get('#city').type(this.signUpTestData.city);
        cy.get('#zipcode').type(this.signUpTestData.zipcode);
        cy.get('#mobile_number').type(this.signUpTestData.mobileNum);

        //Click on Submit button
        cy.get('[data-qa="create-account"]').click();

        //Validation to check account is successfully created
        cy.get('.col-sm-9').then((accountCreationText) => {

            expect(accountCreationText).to.contain(this.signUpTestData.accountCreationTitle)

        })
        cy.get('[data-qa="continue-button"]').click();
    })

    it("Cart and Checkout", function () {


        cy.LoginUsingPara(this.signUpTestData["loginValidCredentials"]["validUserName"], this.signUpTestData["loginValidCredentials"]["validPassword"])

        addItemsToCartAndCheckOutAfterLoginThenPlaceOrder(this.searchProductTestData.productName, this.searchProductTestData.expectedProductName)

        //Proceed with Payment
        cy.get('a[href="/payment"]').click();

        //Enter Card details
        enterCardDetails(this.cardDetails.name, this.cardDetails.cardNumber, this.cardDetails.vcc, this.cardDetails.month, this.cardDetails.year);

        //Check order is placed successfully
        cy.get("div[class='col-sm-9 col-sm-offset-1'] p").then((orderPlacedMessage) => {

            expect(orderPlacedMessage).to.contain(this.cardDetails.orderPlacedTextValue)
        })
    })

    it("Catching error", function () {

        cy.loginUsingInValidCredentials(this.signUpTestData["loginInvalidCredentials"]["inValidUserName"],         
        this.signUpTestData["loginInvalidCredentials"]["inValidPassword"])

    })

    it("Alert Box, Switch Tab and Iframe", function () {

        const alertMessage = "Hello , share this practice page and share your knowledge";
        const url = "https://rahulshettyacademy.com/AutomationPractice/";
        const pageTitle = "QAClick Academy - A Testing Academy to Learn, Earn and Shine";
        const iframeMembershipText = "Mentorship can be a significant part of your overall career success, both early on in your career and even late in your professional life.";

        //1. Switch To Alert Example -> Verify the text in alert and verify the URL

        cy.visit(url).then(() => {
            cy.url().should("include", "/AutomationPractice")
        })

        cy.get("input#alertbtn").click()
        cy.on("window:alert", (win) => {
            expect(win).to.contain(alertMessage)
        })

        //2. Switch Tab Example -> Verify title of the newly opened tab

        cy.get("a#opentab").invoke("attr", "target", "_self").then(() => {

            cy.get('a[href="https://www.qaclickacademy.com"]').click()

            cy.title().should("eq", pageTitle)

            cy.go("back");

        })

        //3. iFrame Example -> Access ‘Mentorship’ li item and perform click operation and verify content loaded for mentorship

        cy.get("#courses-iframe").its("0.contentDocument").as("iFrameDoc").then((iframeBody) => {

            cy.wrap(iframeBody).as("iframeBody")

            cy.intercept("GET", "/mentorship").as("mentorshipCall")

            cy.get("@iframeBody").find('a[href="mentorship"]').eq(0).click({ force: true });

            cy.wait("@mentorshipCall")

            cy.get("@iFrameDoc").find('.inner-box h1').should("be.visible");

            cy.get("@iFrameDoc").find("div.text").eq(0).contains(iframeMembershipText)

        })
    })
})
import { addItemsToCartAndCheckOutBeforeLoginSession, addItemsToCartAndCheckOutAfterLoginAndPlaceOrder, enterCardDetails } from "../support/addItemsToCartAndCheckOut"
import loginTestData from "../../fixtures/loginTestData.json"

describe("Assigment Jan_8_2024", () => {


    beforeEach(() => {


        cy.fixture("../../fixtures/cardDetails.json").then(function (cardDetails) {

            this.cardDetails = cardDetails;

        })

        cy.fixture("../../fixtures/searchProduct.json").then(function (searchProduct) {

            this.searchProduct = searchProduct;

        })

        cy.fixture("../../fixtures/expectedTextValuesDetails.json").then(function (expectedTextValuesDetails) {

            this.expectedTextValuesDetails = expectedTextValuesDetails;

        })


    })


    it("Restore session for non logged user -> 'Perform operation till user get popup to register/login before checking out the items'", function () {

        addItemsToCartAndCheckOutBeforeLoginSession(this.searchProduct.productName, this.expectedTextValuesDetails.checkOutTextValue)


    })



    it("Restore session for non logged user -> 'Perform session storage for user to Login and then continue the checkout process and place the order'", function () {

        addItemsToCartAndCheckOutBeforeLoginSession(this.searchProduct.productName, this.expectedTextValuesDetails.checkOutTextValue)

        cy.LoginUsingSession(loginTestData["loginValidCredentials"]["validUserName"], loginTestData["loginValidCredentials"]["validPassword"])

        addItemsToCartAndCheckOutAfterLoginAndPlaceOrder(this.searchProduct.productName);

        //Proceed with Payment
        cy.get('a[href="/payment"]').click();

        //Enter Card details
        enterCardDetails(this.cardDetails.name, this.cardDetails.cardNumber, this.cardDetails.vcc, this.cardDetails.month, this.cardDetails.year);

        //Check order is placed successfully
        cy.get("div[class='col-sm-9 col-sm-offset-1'] p").should("have.text", this.expectedTextValuesDetails.orderPlacedTextValue);


    })


})







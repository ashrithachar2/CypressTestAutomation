import { addMultipleItemsInCart, fetchItemsInCartAndValidate, checkProductNames, checkProductDescription } from "../support/addItemsInCartValidationMethods";
import loginTestData from '../../fixtures/loginTestData.json'

describe('Assigment Jan_6_2024', () => {


    beforeEach(() => {

        cy.fixture("../../fixtures/loginTestData.json").then(function (loginTestData) {

            this.loginTestData = loginTestData;

        })


        cy.LoginUsingSession(loginTestData["loginValidCredentials"]["validUserName"], loginTestData["loginValidCredentials"]["validPassword"])

           

        
    })


    it('Custom Commands for Logout and Delete Account functions', function () {

        //Login using custom command and Fixture file
        //cy.LoginUsingFixtures();

        //Login using parameters
        //cy.LoginUsingPara(this.loginTestData["loginValidCredentials"]["validUserName"], this.loginTestData["loginValidCredentials"]["validPassword"]);

        //Login using session storage
        //cy.LoginUsingSession(this.loginTestData["loginValidCredentials"]["validUserName"], this.loginTestData["loginValidCredentials"]["validPassword"])


        //Peform Logout using intercept()
        cy.visit("/");
        cy.Logout();



        //cy.Login();
        // cy.DeleteAccount();

    })

    it('Add some products to cart manually and create methods to check items in cart holding atleast one value and click on checkout and check values in check out page', () => {

        cy.visit('/products');

        cy.get('[id="search_product"]').type('Men');
        cy.get('[id="submit_search"]').click();

        addMultipleItemsInCart();

        cy.get("li a[href='/view_cart']").should("be.visible").click();

        fetchItemsInCartAndValidate();

        checkProductNames();

        checkProductDescription();


    });


})






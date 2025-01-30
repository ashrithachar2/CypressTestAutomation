import ProductPage from "./ProductPage.cy";
import CheckoutTestData from "../../../fixtures/loginAddProductCheckoutTestData.json";

class CheckOutPage {

    constructor() {
        this.checkOutBtn = ".btn_action.checkout_button";
        this.firstName = "#first-name";
        this.lastName = "#last-name";
        this.postalCode = "#postal-code";
        this.chkOutBtn = ".btn_primary.cart_button";
        this.finishBtn = ".btn_action.cart_button";
        this.orderPlacedTextField = "h2.complete-header";
        this.productName = ".inventory_item_name";
        this.cart = 'path[fill="currentColor"]';
    }
    
    clickCartVerifyProductClickCheckOut() {

        cy.get(this.cart).click();

        cy.get(this.productName).should("have.text",  CheckoutTestData.productName);

        cy.get(this.checkOutBtn).click();

    }

    fillCheckOutInfoPlaceOrder() {

        cy.get(this.firstName).clear().type(CheckoutTestData.firstName);
        cy.get(this.lastName).clear().type(CheckoutTestData.lastName);
        cy.get(this.postalCode).clear().type(CheckoutTestData.postalCode);
        cy.get(this.chkOutBtn).click();
        cy.get(this.finishBtn).click();
    }

    fetchOrderPlacedSuccessfullText() {

        cy.get(this.orderPlacedTextField).should("have.text", CheckoutTestData.orderPlacedText);

    }

}

export default CheckOutPage;
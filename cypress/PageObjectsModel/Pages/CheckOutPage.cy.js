import ProductPage from "./ProductPage.cy";

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
    
    clickCartVerifyProductClickCheckOut(productTitle) {

        cy.get(this.cart).click();

        cy.get(this.productName).should("have.text", productTitle);

        cy.get(this.checkOutBtn).click();

    }

    fillCheckOutInfoPlaceOrder(firstName, lastName, postalCode) {

        cy.get(this.firstName).clear().type(firstName);
        cy.get(this.lastName).clear().type(lastName);
        cy.get(this.postalCode).clear().type(postalCode);
        cy.get(this.chkOutBtn).click();
        cy.get(this.finishBtn).click();
    }

    fetchOrderPlacedSuccessfullText(orderPlacedText) {

        cy.get(this.orderPlacedTextField).should("have.text", orderPlacedText);

    }

}

export default CheckOutPage;
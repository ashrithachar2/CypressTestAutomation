import { addMultipleItemsInCart, fetchItemsInCartAndValidate, checkProductName, checkProductNames,addSingleItemInCart } from "../support/addItemsInCartValidationMethods";

export const addItemsToCartAndCheckOutBeforeLoginSession = (searchItem, checkOutText) => {

    cy.session(([searchItem, checkOutText]), () => {

        cy.visit("/products");

        cy.get('[id="search_product"]').type(searchItem);
        cy.get('[id="submit_search"]').click();

        addMultipleItemsInCart();

        cy.get("li a[href='/view_cart']").should("be.visible").click();

        checkProductNames();

        //click on proceed to checkout
        cy.get(".btn.btn-default.check_out").then((checkOutBtn) => {

            cy.wrap(checkOutBtn).click();

            //Check Checkout pop-up is displayed correctly
            cy.get(".modal-title.w-100").should("contain.text", checkOutBtn);

            //Check register/login button is vissible
            cy.get('.modal-content p a[href="/login"]').should("be.visible").click();
        })

    },

        {

            cacheAcrossSpecs: true
        }
    )


}


export const addItemsToCartAndCheckOutAfterLoginAndPlaceOrder = (searchItem) => {

    cy.visit("/products");

    cy.get('[id="search_product"]').type(searchItem);
    cy.get('[id="submit_search"]').click();

    addMultipleItemsInCart();

    cy.get("li a[href='/view_cart']").should("be.visible").click();

    checkProductNames();

    //click on proceed to checkout
    cy.get(".btn.btn-default.check_out").click();

    cy.get(".container").eq(1).should("contain.text", "Address Details").and("contain.text", "Your delivery address").and("contain.text", "Review Your Order");

}


export const enterCardDetails = (name, cardNumber, vcc, month, year) => {

    //Enter Card Details
    cy.get("input[name='name_on_card']").type(name);
    cy.get("input[name='card_number']").type(cardNumber);
    cy.get("input[placeholder='ex. 311']").type(vcc);
    cy.get("input[placeholder='MM']").type(month);
    cy.get("input[placeholder='YYYY']").type(year)
    cy.get("#submit").click();


}



export const addItemsToCartAndCheckOutAfterLoginThenPlaceOrder = (searchItem, chkProductName) => {

    cy.visit("/products");

    cy.get('[id="search_product"]').type(searchItem);
    cy.get('[id="submit_search"]').click();

    addSingleItemInCart();

    cy.get("li a[href='/view_cart']").should("be.visible").click();

    checkProductName(chkProductName);

    cy.intercept("GET", "/checkout").as("checkOut")

    //click on proceed to checkout
    cy.get(".btn.btn-default.check_out").click();

    cy.wait("@checkOut").its("response.statusCode").should('eq', 200).get(".cart_description h4").should("have.text", chkProductName[0])







    //click on proceed to checkout
    // cy.get(".btn.btn-default.check_out").click();







    //cy.get(".container").eq(1).should("contain.text","Address Details").and("contain.text","Your delivery address").and("contain.text","Review Your Order");

}



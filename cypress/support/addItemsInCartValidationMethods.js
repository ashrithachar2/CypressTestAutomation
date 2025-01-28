export const addMultipleItemsInCart = () => {

    cy.get('[class="single-products"]').should("be.visible").then(() => {

        cy.get(".btn.btn-default.add-to-cart").eq(0).click();

        cy.get(".modal-content").contains("Continue Shopping").as("clickContinue").trigger("click");

        cy.get(".btn.btn-default.add-to-cart").eq(2).click();

        cy.get("@clickContinue").trigger("click");

    })
};


export const addSingleItemInCart = () => {

    cy.get('[class="single-products"]').should("be.visible").then(() => {

        cy.get(".btn.btn-default.add-to-cart").eq(0).click();

        cy.get(".modal-content").contains("Continue Shopping").as("clickContinue").trigger("click");


    })
};


export const fetchItemsInCartAndValidate = () => {


    cy.get("table tbody tr").then((i) => {

        if (i.length >= 1) {

            cy.log("Items in cart hold atleast one item")
        }

        else {
            cy.log("Items in cart doesn't hold atleast one item")
        }

    })
}


export const checkProductNames = () => {

    let actualProductNames = [];
    const expectedProductNames = ['Men Tshirt', 'Madame Top For Women']

    cy.get("tr td h4").then(($elements) => {

        let productCount = $elements.length;

        for (let i = 0; i < productCount; i++) {

            cy.wrap($elements).eq(i).invoke('text').then(productName => {
                console.log(productName.trim());
                actualProductNames.push(productName.trim());
            });



        }

    })

    cy.wrap(null).then(() => {

        cy.log("Expected Product Names values are: " + expectedProductNames)
        cy.log("Actual Product Names values are: " + actualProductNames)

        expect(actualProductNames).to.deep.equal(expectedProductNames);

    })


}


export const checkProductDescription = () => {

    let actualProductDescriptions = [];
    const expectedProductDescriptions = ['Men > Tshirts', 'Women > Tops']

    cy.get(".cart_description > p").then(($elements) => {

        let productDesCount = $elements.length;

        for (let i = 0; i < productDesCount; i++) {

            cy.wrap($elements).eq(i).invoke('text').then(productDescriptions => {
                console.log(productDescriptions.trim());
                actualProductDescriptions.push(productDescriptions.trim());
            });

        }

    })

    cy.wrap(null).then(() => {

        cy.log("Expected Product Description values are: " + expectedProductDescriptions)
        cy.log("Actual Product Description values are: " + actualProductDescriptions)

        expect(actualProductDescriptions).to.deep.equal(expectedProductDescriptions);

    })
}


export const checkProductName = (exptProductNames) => {

    let actualProductNames = [];
    const expectedProductNames = exptProductNames;
    //const expectedProductNames = ['Men Tshirt', 'Madame Top For Women']

    cy.get("tr td h4").then(($elements) => {

        let productCount = $elements.length;

        for (let i = 0; i < productCount; i++) {

            cy.wrap($elements).eq(i).invoke('text').then(productName => {
                console.log(productName.trim());
                actualProductNames.push(productName.trim());
            });



        }

    })

    cy.wrap(null).then(() => {

        cy.log("Expected Product Names values are: " + expectedProductNames)
        cy.log("Actual Product Names values are: " + actualProductNames)

        expect(actualProductNames).to.deep.equal(expectedProductNames);

    })


}
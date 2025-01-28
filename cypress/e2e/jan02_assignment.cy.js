describe('jan02_assignment', () => {

    it('Accessing element that has multiple occurances from the webpage(View Product)', () => {

        let productCost = "Rs. 600";
        const productName = "Winter Top";
        const brandName = " Mast & Harbour";

        cy.visit('/');

        //To fetch required product through array using <.eq()> method and clicking on 'View Product' button
        cy.get(".features_items .col-sm-4", { timeout: 5000 }).eq(4).should("be.visible").then(($ele) => {
            cy.wrap(($ele)).should("contain.text", productCost, productName);
            cy.wrap(($ele)).contains('View Product').click();

        })

        //Check whether product's name, cost, brand text values are correctly displayed after clicking on 'View Product' button
        cy.get('div[class="product-information"]').as("productInfoGrid").should("contain.text", productName);

        cy.get('span span').then((prodCost) => {
            expect(prodCost.text()).to.eq(productCost);
        })

        cy.get("@productInfoGrid").should("contain.text", "Brand:").and("contain.text", brandName);

    })


    it('Search with any keyword and get the list of items displayed(counts and values printed) using both contains and equals', () => {

        cy.visit('/products');
        cy.get('[id="search_product"]').type('Men');
        cy.get('[id="submit_search"]').click();

        const expectedProductCount = 4;
        const expectedProductName = ['Men Tshirt', 'Madame Top For Women', 'Lace Top For Women', 'GRAPHIC DESIGN MEN T SHIRT - BLUE'];

        let actualProductName = [];

        cy.get('[class="single-products"]').should('have.length', expectedProductCount).then(productItems => {
            const actualProductCount = productItems.length;

            for (let i = 0; i < actualProductCount; i++) {
                cy.wrap(productItems).eq(i).find('div p').first().invoke('text').then(productName => {
                    console.log(productName.trim());
                    actualProductName.push(productName.trim());
                });
            }

            // Use cy.wrap to ensure the assertions run after the loop completes
            cy.wrap(null).then(() => {
                cy.log(actualProductName);
                cy.log(expectedProductName);
                expect(actualProductName).to.deep.equal(expectedProductName);
                expect(actualProductCount).to.equal(expectedProductCount);
            });
        });
    });

})



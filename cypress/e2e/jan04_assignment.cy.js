describe('jan04_assignment', () => {

    it('Sort the cost values from low to high', () =>{

        //Launch the webpage
        cy.SwagLabUrl();
 
        //Select low to high
        cy.get(".product_sort_container").select("Price (low to high)");

        cy.get(".inventory_item_price").then(($elements)=>{

            const originalPrices = [...$elements].map((el)=>
            parseFloat(el.innerText.replace(/[^0-9.]/g,'')));

            const sortedPrices = [...originalPrices].sort((a,b)=> a-b)

            //Print the array outputs
            cy.log("Actual displayed prices of the items in array is  : "+originalPrices)
            cy.log("Expected sorted prices in array is  : "+sortedPrices)

            //Check prices are displayed/filtered low to high 
            expect(originalPrices).to.deep.equal(sortedPrices)
               
        })          
        });

        it('Sort the cost values from High to low', () =>{

            //Launch the webpage
            cy.SwagLabUrl();

            //Select high to low
            cy.get(".product_sort_container").select("Price (high to low)");
    
            cy.get(".inventory_item_price").then(($elements)=>{
    
                const originalPrices = [...$elements].map((el)=>
                parseFloat(el.innerText.replace(/[^0-9.]/g,'')));
    
                const sortedPrices = [...originalPrices].sort((a,b)=> b-a)

                //Print the array outputs
                cy.log("Actual displayed prices of the items in array is  : "+originalPrices)
                cy.log("Expected sorted prices in array is  : "+sortedPrices)

                //Check prices are displayed/filtered low to high 
                expect(originalPrices).to.deep.equal(sortedPrices)
                   
            
            })          
            });

    })



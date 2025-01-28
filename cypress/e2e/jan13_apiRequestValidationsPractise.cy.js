describe("API Validations", () => {

    beforeEach(()=>{

        cy.fixture("../../fixtures/networkCallTestData.json").then(function(networkCallTestData){

            this.networkCallTestData = networkCallTestData;

        })

    })


    it("GET Method", function (){

        cy.request({

            method: "GET",
            url: "https://automationexercise.com/api/productsList"

        }).then((getResponseBody) => {

            const responseBody = JSON.parse(getResponseBody.body)

            expect(responseBody.responseCode).to.be.eq(200)

            responseBody.products.forEach((product) => {

                if (product.id === 4)
                    expect(product.category.usertype.usertype).to.equal(this.networkCallTestData.GET["productCategory"])
            })
        })
    })

    it("POST Method", function ()  {

        cy.request({

            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
            form: true,
            body: {
                "search_product": "Jeans"
            }

        }).then((getResponseBody) => {

            const responseBody = JSON.parse(getResponseBody.body)

            expect(responseBody.responseCode).to.be.equal(200)

            responseBody.products.forEach((product) => {

                expect(product.name).to.be.contain(this.networkCallTestData.POST["searchProduct"])
            })
        })
    })

    it("PUT Method", function()  {

        //Using fixture file to derive the data

        cy.fixture("../../fixtures/networkCallTestData.json").then((networkCallTestData) => {

            cy.request({

                method: "PUT",
                url: "https://automationexercise.com/api/updateAccount",
                form: true,
                body: this.networkCallTestData.PUT


            }).then((getResponse) => {

                const responseBody = JSON.parse(getResponse.body)

                expect(responseBody.responseCode).to.be.eq(200)
                expect(responseBody.message).to.eq("User updated!")
            })

        })

    })

    it.skip("DELETE Method", function()  {

        cy.request({

            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            form: true,
            body: this.networkCallTestData.DELETE
                
            

        }).then((getResponseBody) => {

            const responseBody = JSON.parse(getResponseBody.body)

            expect(responseBody.responseCode).to.equal(200);
            expect(responseBody.message).to.equal("Account deleted!");

        })

    })

})
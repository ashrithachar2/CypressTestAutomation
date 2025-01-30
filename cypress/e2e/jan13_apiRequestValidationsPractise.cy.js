describe("API Validations", () => {

    beforeEach(() => {

        cy.fixture("../../fixtures/networkCallTestData.json").then(function (networkCallTestData) {

            this.networkCallTestData = networkCallTestData;

        })

    })


    it("GET Method", function () {

        cy.request({

            method: "GET",

            url: `${Cypress.env('apiBaseUrl')}/productsList`,


        }).then((getResponseBody) => {

            const responseBody = JSON.parse(getResponseBody.body)

            expect(responseBody.responseCode).to.be.eq(200)

            responseBody.products.forEach((product) => {

                if (product.id === 4)
                    expect(product.category.usertype.usertype).to.equal(this.networkCallTestData.GET["productCategory"])
            })
        })
    })

    it("POST Method", function () {

        cy.request({

            method: "POST",
            url: `${Cypress.env('apiBaseUrl')}/searchProduct`,
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

    it("PUT Method", function () {

        //Using fixture file to derive the data

        cy.fixture("../../fixtures/networkCallTestData.json").then((networkCallTestData) => {

            cy.request({

                method: "PUT",
                url: `${Cypress.env('apiBaseUrl')}/updateAccount`,
                form: true,
                body: this.networkCallTestData.PUT


            }).then((getResponse) => {

                const responseBody = JSON.parse(getResponse.body)

                expect(responseBody.responseCode).to.be.eq(200)
                expect(responseBody.message).to.eq("User updated!")
            })

        })

    })

    it.skip("DELETE Method", function () {

        cy.request({

            method: "DELETE",
            url: `${Cypress.env('apiBaseUrl')}/deleteAccount`,
            form: true,
            body: this.networkCallTestData.DELETE



        }).then((getResponseBody) => {

            const responseBody = JSON.parse(getResponseBody.body)

            expect(responseBody.responseCode).to.equal(200);
            expect(responseBody.message).to.equal("Account deleted!");

        })

    })

})
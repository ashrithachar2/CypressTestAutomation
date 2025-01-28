describe("Handling multiple tabs", () => {

    const url = "https://the-internet.herokuapp.com/windows";
    const newTabUrl = "https://the-internet.herokuapp.com/windows/new";


    beforeEach(() => {

        cy.visit(url).then(() => {

            cy.url().should("contain", "/windows")

        });

    })

    it("Handling new browser tab/page by removing target attribute", () => {

        cy.get(".example > a").invoke("removeAttr", "target").then(() => {

            cy.get("a[href='/windows/new']").click()

            cy.url().should("eq", newTabUrl);

            cy.go("back")

        })

    })

    it("Handling new browser tab/page by overwiting target attribute", () => {

        cy.get(".example > a").invoke("attr", "target", "_self").then(() => {

            cy.get("a[href='/windows/new']").click()

            cy.url().should("eq", newTabUrl);

            cy.reload(true)

            cy.go(-1)

        })

    })

    it("Handling new browser tab using chain command", () => {

        cy.get(".example > a").then(($tab) => {

            const newTab = $tab.eq(0).prop("href")

            cy.visit(newTab)

            cy.url().should("eq", newTabUrl);

        })

    })

    it("Using reload() method to perform reload webpage functionality", () => {

        cy.reload(true)

})

})





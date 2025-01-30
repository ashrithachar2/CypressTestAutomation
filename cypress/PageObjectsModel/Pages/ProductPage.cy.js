import LoginPage from "./LoginPage.cy";
import ProductTestData from "../../../fixtures/loginAddProductCheckoutTestData.json";


class ProductPage {

    login = new LoginPage();

    constructor() {

        this.sortDropDown = ".product_sort_container";

        this.itemPrices = ".inventory_item_price";

        this.lastAddToCart = ".btn_primary.btn_inventory";

        this.productName = ".inventory_item_name";
    }

    launchHomePageUrl() {

        cy.visit(ProductTestData.urlHomePage);
        cy.url().should("include", "/v1/inventory.html");

    }

    clickDropDownToCheckAscendingOrder() {

        this.launchHomePageUrl();

        cy.get(this.sortDropDown).should("be.visible").select(ProductTestData.dropDownValue);

        cy.get(this.itemPrices).then(($priceValues) => {

            let actualPriceOrder = [...$priceValues].map((actualPriceOrder) =>

                parseFloat(actualPriceOrder.innerText.replace(/[^0-9.]/g, '')));

            let sortedPriceOrder = [...actualPriceOrder].sort((a, b) => a - b);

            cy.log("Actual Price Order is: " + actualPriceOrder);
            cy.log("Expected Price Sort order is: " + sortedPriceOrder);

            expect(actualPriceOrder).to.deep.equal(sortedPriceOrder);
        })
        cy.get(this.lastAddToCart).then(($addToCart) => {

            cy.wrap($addToCart).last().click();

        })
    }
}
export default ProductPage;
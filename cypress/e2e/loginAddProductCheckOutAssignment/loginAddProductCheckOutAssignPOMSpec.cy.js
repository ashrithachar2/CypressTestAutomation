import loginProuctCheckOutTestData from "../../../fixtures/loginAddProductCheckoutTestData.json";
import CheckOutPage from "../../PageObjectsModel/Pages/CheckOutPage.cy";
import LoginPage from "../../PageObjectsModel/Pages/LoginPage.cy"
import ProductPage from "../../PageObjectsModel/Pages/ProductPage.cy";

describe("Jan_27_Assignment_Using_POM_Principle_To_Login_Add_Products_Checkout_And_Place_Order", () => {


    beforeEach(() => {

        cy.fixture("../../fixtures/loginAddProductCheckoutTestData.json").then(function (loginAddProuctCheckOutTestData) {

            this.loginAddProuctCheckOutTestData = loginAddProuctCheckOutTestData;

        })

        login.loginUser(loginProuctCheckOutTestData.userName, loginProuctCheckOutTestData.password, loginProuctCheckOutTestData.url)

    })

    const login = new LoginPage();
    const product = new ProductPage();
    const checkout = new CheckOutPage();


    it("Sort the prices using sorting dropdown and click on add to cart on highest priced product", function () {

        product.clickDropDownToCheckAscendingOrder(this.loginAddProuctCheckOutTestData.dropDownValue, this.loginAddProuctCheckOutTestData.urlHomePage);
        checkout.clickCartVerifyProductClickCheckOut(this.loginAddProuctCheckOutTestData.productName);
        checkout.fillCheckOutInfoPlaceOrder(this.loginAddProuctCheckOutTestData.firstName, this.loginAddProuctCheckOutTestData.lastName, this.loginAddProuctCheckOutTestData.postalCode);
        checkout.fetchOrderPlacedSuccessfullText(this.loginAddProuctCheckOutTestData.orderPlacedText);

    })

})
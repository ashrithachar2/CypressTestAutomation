import CheckOutPage from "../../PageObjectsModel/Pages/CheckOutPage.cy";
import LoginPage from "../../PageObjectsModel/Pages/LoginPage.cy"
import ProductPage from "../../PageObjectsModel/Pages/ProductPage.cy";

describe("Jan_27_Assignment_Using_POM_Principle_To_Login_Add_Products_Checkout_And_Place_Order", () => {


    beforeEach(() => {

        login.loginUser()

    })

    const login = new LoginPage();
    const product = new ProductPage();
    const checkout = new CheckOutPage();


    it("Sort the prices using sorting dropdown and click on add to cart on highest priced product", async function () {

        product.clickDropDownToCheckAscendingOrder();
        checkout.clickCartVerifyProductClickCheckOut();
        checkout.fillCheckOutInfoPlaceOrder();
        checkout.fetchOrderPlacedSuccessfullText();

    })

})
import { checkColorValues, checkArraySort, selectDateThroughDatePicker } from "../support/formValidationMethods.js"

describe("Form Validation", () => {

    beforeEach(() => {

        cy.visit("https://testautomationpractice.blogspot.com/");

        cy.fixture("../../fixtures/enterFormDetails.json").then(function (enterFormDetails) {

            this.enterFormDetails = enterFormDetails;

        })
    })

    it("Form Validation", function () {

        cy.get("#name").type(this.enterFormDetails.name).should("have.value", this.enterFormDetails.name)
        cy.get("#email").type(this.enterFormDetails.email).should("have.value", this.enterFormDetails.email)
        cy.get("#phone").type(this.enterFormDetails.phoneNumber).should("have.value", this.enterFormDetails.phoneNumber)
        cy.get("#textarea").clear().type(this.enterFormDetails.address).should("have.value", this.enterFormDetails.address)
        cy.get("#male").check().should("be.checked")
        cy.get("#sunday").check().should("be.checked")
        cy.get("#monday").check().should("be.checked")

        checkColorValues(this.enterFormDetails.colorsValues);

        checkArraySort();

        //Enter date values in date picker by simple type() method
        cy.get("#datepicker").scrollIntoView().clear().type(this.enterFormDetails.date + "{enter}").should("have.value", this.enterFormDetails.date)

        //Enter Enter date values in date picker by using prev and next button and select() method
        selectDateThroughDatePicker(this.enterFormDetails.year, this.enterFormDetails.day, this.enterFormDetails.date);
    })

})




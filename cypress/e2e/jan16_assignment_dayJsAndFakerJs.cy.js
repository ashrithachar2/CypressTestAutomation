const dayjs = require("dayjs");
import { faker } from "@faker-js/faker";

describe("Using dayJs to fetch the current system date and formatting it", () => {

    it("dayJs", () => {

     const todaysDate = dayjs().format("DD/MM/YYYY")
        cy.log(todaysDate)
        const date = "1/25/2025"
        const newDate = dayjs(date).format("DD/MM/YYYY")
        cy.log(newDate)
    })

    it("Using fakerJs to fetch random test data", () => {

        const personName = faker.person.firstName()+ " " + faker.person.lastName()
        const emailId = faker.internet.email();
        const password = faker.internet.password();
        const address = faker.location.streetAddress() + " " + faker.location.secondaryAddress();
        const country  =  "India";
        const state = faker.location.state();
        const city = faker.location.city()
        const zipcode = faker.location.zipCode();
        const mobileNum = faker.phone.number();
        const day = faker.number.int({min:1 , max:30})
        const month = faker.date.month();
        const year = "2000";
        const firstName = personName.split(" ")[0];
        const lastName = personName.split(" ")[1];
        const company = faker.company.name();

        let expectedTitle = "Enter Account Information";

        cy.visit('/');
        cy.get('.features_items > .title').contains('Features Items');

        //Click on Sign Up Button
        cy.get('a[href="/login"]').click();

        //Enter values in New User SignUp and Submit
        cy.get('input[data-qa="signup-name"]').type(personName);
        cy.get('input[data-qa="signup-email"]').type(emailId);
        cy.get('[data-qa="signup-button"]').click();

        //Verify the title
        cy.get('.login-form > h2 > b').then((actualTitle) => {
            expect(actualTitle.text()).to.contain(expectedTitle);
        });
        //Perform the operations
        cy.get('#id_gender1').click();

        //Validation to check name field is correctly fetched the value
        cy.get('#name.form-control').should('have.attr', 'value', personName);

        //Validation to check email field is diabled and correctly fetched the value
        cy.get('#email').should("be.disabled");
        //cy.get('#email').should('have.attr', 'value', Math.floor(Math.random()*700+signUpTestData.emailID));

        cy.get('#password').type(password);
        cy.get('#days').select(day);
        cy.get('#months').select(month);
        cy.get('#years').select(year);
        cy.get('#newsletter').check();
        cy.get('#optin').check();
        cy.get('p input[data-qa="first_name"].form-control').type(firstName);
        cy.get('p input[data-qa="last_name"].form-control').type(lastName);
        cy.get('p :nth-child(2)#company').type(company);
        cy.get('#address1').type(address);
        cy.get('#country').select(country);
        cy.get('#state').type(state);
        cy.get('#city').type(city);
        cy.get('#zipcode').type(zipcode);
        cy.get('#mobile_number').type(mobileNum);

        //Click on Submit button
        cy.get('[data-qa="create-account"]').click();
    })
})
import { faker } from "@faker-js/faker";

describe("Using xpath to locate the elements and generate the report", () => {


    it("Using xpath to locate the elements and generate the report", () => {

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
        cy.xpath("//h2[normalize-space()='Features Items']").contains('Features Items');

        //Click on Sign Up Button
        cy.xpath("//a[@href='/login'][normalize-space()='Signup / Login']").click();

        //Enter values in New User SignUp and Submit
        cy.xpath("//input[@placeholder='Name']").type(personName);
        cy.xpath("//input[@data-qa='signup-email']").type(emailId);
        cy.xpath("//button[normalize-space()='Signup']").click();

        //Verify the title
        cy.xpath("//h2//b[normalize-space()='Enter Account Information']").then((actualTitle) => {
            expect(actualTitle.text()).to.contain(expectedTitle);
        });
        //Perform the operations
        cy.xpath("//input[@id='id_gender1']").click();

        //Validation to check name field is correctly fetched the value
        cy.xpath("//input[@id='name']").should('have.attr', 'value', personName);

        //Validation to check email field is diabled and correctly fetched the value
        cy.xpath("//input[@id='email']").should("be.disabled");

        cy.xpath("//input[@id='password']").type(password);
        cy.xpath("//select[@id='days']").select(day);
        cy.xpath("//select[@id='months']").select(month);
        cy.xpath("//select[@id='years']").select(year);
        cy.xpath("//input[@id='newsletter']").check();
        cy.xpath("//input[@id='optin']").check();
        cy.xpath("//input[@id='first_name']").type(firstName);
        cy.xpath("//input[@id='last_name']").type(lastName);
        cy.xpath("//input[@id='company']").type(company);
        cy.xpath("//input[@id='address1']").type(address);
        cy.xpath("//select[@id='country']").select(country);
        cy.xpath("//input[@id='state']").type(state);
        cy.xpath("//input[@id='city']").type(city);
        cy.xpath("//input[@id='zipcode']").type(zipcode);
        cy.xpath("//input[@id='mobile_number']").type(mobileNum);

        //Click on Submit button
        cy.xpath("//button[normalize-space()='Create Account']").click();
    })
})
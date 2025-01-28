import signUpTestData from "../../fixtures/loginTestData.json"


describe('Validation of web page', () => {


    let expectedTitle = "Enter Account Information";
    let accountCreationTitle = "Congratulations! Your new account has been successfully created!";
    let accountDelTitle = "Account Deleted!";
    let accountDelText = "Your account has been permanently deleted!";
    let accountNotExisText = "Your email or password is incorrect!";

    it('Perform Sign-Up functionality', () => {

    //Navigating to Url
    cy.visit('/');
    cy.get('.features_items > .title').contains('Features Items');

    //Click on Sign Up Button
    cy.get('a[href="/login"]').click();

    //Enter values in New User SignUp and Submit
    cy.get('input[data-qa="signup-name"]').type(signUpTestData.name);
    cy.get('input[data-qa="signup-email"]').type(Math.floor(Math.random()*700)+signUpTestData.signUpEmailID);
    cy.get('[data-qa="signup-button"]').click();

    //Verify the title
    cy.get('.login-form > h2 > b').then((actualTitle) => {
      expect(actualTitle.text()).to.contain(expectedTitle);
    });

    //Perform the operations
    cy.get('#id_gender1').click();

    //Validation to check name field is correctly fetched the value
    cy.get('#name.form-control').should('have.attr', 'value', signUpTestData.name);

    //Validation to check email field is diabled and correctly fetched the value
    cy.get('#email').should("be.disabled");
    //cy.get('#email').should('have.attr', 'value', Math.floor(Math.random()*700+signUpTestData.emailID));

    cy.get('#password').type(signUpTestData.password);
    cy.get('#days').select(signUpTestData.date);
    cy.get('#months').select(signUpTestData.month);
    cy.get('#years').select(signUpTestData.year);
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('p input[data-qa="first_name"].form-control').type(signUpTestData.firstName);
    cy.get('p input[data-qa="last_name"].form-control').type(signUpTestData.lastName);
    cy.get('p :nth-child(2)#company').type(signUpTestData.company);
    cy.get('#address1').type(signUpTestData.address);
    cy.get('#country').select(0);
    cy.get('#state').type(signUpTestData.state);
    cy.get('#city').type(signUpTestData.city);
    cy.get('#zipcode').type(signUpTestData.zipcode);
    cy.get('#mobile_number').type(signUpTestData.mobileNum);

    //Click on Submit button
    cy.get('[data-qa="create-account"]').click();

    //Validation to check account is successfully created
    cy.get('.col-sm-9').should('contain', accountCreationTitle);
    cy.get('[data-qa="continue-button"]').click();

  })

  it("Perform Login-In functionality and Search any product and then Log-out", ()=>{

    cy.visit('/login');
    cy.get("div.login-form > h2").should("be.visible").then(()=>{

      cy.Login();
    })

    //Check for attributes - Logged-in Username, Logout and Delete Account button
    cy.get('li > a').should("be.visible").then((ele)=>{

      expect(ele.text()).to.contain(" Logged in as ");
      cy.get('li > a > b').should("have.text", signUpTestData.name);
      cy.get('a[href="/logout"]').should("be.visible");
      cy.get('a[href="/delete_account"]').should("be.visible")

    })

    //Check any product below list by click functionality and verify it's name
    cy.get('a[href="/product_details/2"]').click();
    cy.get('div[class="product-information"] h2').should("have.text", signUpTestData.productName)

    //Perform Log-out and check Log-out button is not visible
    cy.get('a[href="/logout"]').click();
    cy.get('a[href="/login"]').should("be.visible");

  })

  it.skip("Perform Delete Account Functionality", ()=>{

    //Login
    cy.visit('/login');
    cy.get("div.login-form > h2").should("be.visible").then(()=>{
      cy.Login();
    })
    cy.get('a[href="/delete_account"]').click();

    //Verify 'Account Deleted' message is displayed successfully
    cy.get('h2> b').should("have.text",accountDelTitle);
    cy.get('div.col-sm-9.col-sm-offset-1 p:first-of-type').should("have.text", accountDelText);
    cy.get('[data-qa="continue-button"]').click();

    //Verify account is deleted successfully by Log-in
    cy.get('a[href="/login"]').click();

    cy.get("div.login-form > h2").should("be.visible").then(()=>{
      cy.Login();
    cy.get('form[action="/login"] > p').should("have.text", accountNotExisText)
    })
    
  })

})
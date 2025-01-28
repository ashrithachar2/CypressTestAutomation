
export const loginMethod =  (email,pass)=>{

    cy.visit('/login');
    cy.get("div.login-form > h2").should("be.visible").then(()=>{

        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(pass);
        cy.get('[data-qa="login-button"]').click();
    
    })


}
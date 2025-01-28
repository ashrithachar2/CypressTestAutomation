export const shadowDomMethod =  (shadowBody)  => {

    cy.get(shadowBody).shadow().then(($shadowId)=>{

       return cy.wrap($shadowId)

    })

}
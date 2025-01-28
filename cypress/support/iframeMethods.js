export const iFrameMethod =  (iframeBody) => {

    cy.get(iframeBody)
        .its('0.contentDocument.body').should('not.be.empty').then( (iFrame) => {
            return (cy.wrap(iFrame))
        })
}


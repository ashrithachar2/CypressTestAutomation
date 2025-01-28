//iframe -Spec file
 
import {iFrameMethod} from '../support/iframeMethods.js'
 
describe('iframe handling',  () => {
 
    beforeEach( () => {
        cy.visit('https://jqueryui.com/droppable/')
    })
 
    it('accessing web element', () => {
        cy.get('.entry-title').should('be.visible')
        // cy.get('#draggable').should('be.visible')
        cy.get('iframe.demo-frame')
        .its('0.contentDocument.body')
        .find('#draggable')
 
        cy.get('iframe.demo-frame')
        .its('0.contentDocument.body')
        .find('#droppable')
    })  
   
   
    it('Inline frame handling using wrap()',() => {
        cy.get('iframe.demo-frame')
        .its('0.contentDocument.body').should('not.be.empty').then((frameBody) =>{
            cy.wrap(frameBody).as('iFrameBody')
            cy.get('@iFrameBody').find('#draggable > p').should('have.text','Drag me to my target')  
        })      
    })
  
    
    it('Accessing iFrame using custom commands',() => {
        cy.getiFrame('iframe.demo-frame').within(() => {
            cy.get('#draggable > p').should('have.text','Drag me to my target')
        })
    })
 
    it('Accessing frame using package', () => {
        cy.frameLoaded('.demo-frame')
        cy.iframe().find('#draggable > p').should('have.text','Drag me to my target')
        cy.iframe().find('#draggable > p').then((txt) => {
            const txtValue =  txt.text()
            expect(txtValue).equals('Drag me to my target')
        })
    })
})
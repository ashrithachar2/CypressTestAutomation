import userData from '../../fixtures/loginTestData.json'
 
describe('Validating sign up application', () => {
    beforeEach(() => {
        cy.LoginUsingSession(userData.loginEmailID,userData.password)
    })
 
    it('Login with custom commands',() => {
        cy.visit('/')
        cy.get('li > a > .fa.fa-user').should('be.visible').then(()=>{
            cy.get('b').invoke('text').then((loggedUserName) => {
                expect(loggedUserName).equals(userData.name)
            })
        })
    })
 
    it('User adding products and click on view cart',() => {
        cy.intercept('GET', '/view_cart').as('viewCart')
        cy.visit('/')
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.get('button.btn.btn-default.cart').click()
        cy.get('[href="/view_cart"]').eq(0).click()
        cy.wait('@viewCart')
        .its('response.statusCode')
        .should('eq', 200)
        cy.url().should('contains','/view_cart')
    })
    it('User successfully launched on cart page', () => {
        cy.visit('/')
        cy.get('.btn.btn-default.check_out').invoke('text').then((btnText) => {
            expect(btnText).equals('Proceed To Checkout')
        })        
    })

    it.only('User adding products and click on view cart',() => {
        cy.intercept('GET', '/view_cart',{fixture: '../../fixtures/mock.json'}).as('viewCart')
        cy.visit('/')
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.get('button.btn.btn-default.cart').click()
        cy.get('[href="/view_cart"]').eq(0).click()
        cy.wait('@viewCart')
        .its('response.statusCode')
        .should('eq', 200)
        cy.visit("/view_cart")
        //cy.get('a[href="/view_cart"]').eq(0).click()
        //cy.get('.btn.btn-default.check_out').invoke('text').then((btnText) => {
            //expect(btnText).equals('Proceed To Checkout')
        //})  
    })
 
    /*it('validating response body',() => {
        //html file need to be created on own for this example. For instance, we can alter the steps according to real website url
        cy.visit('intetcept-local/intercept.html')
        cy.intercept({
            pathname: '/users',
            query:{
                _limit : '3'
            }
        })
        // ,{fixture: '/'})
        .as('getUsers')
        cy.wait('@getUsers')
        cy.get('@getUsers').then((response) => {
            cy.log(JSON.stringify(response))
        })
    })*/
})
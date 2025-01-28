describe('Alerts', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    })

    //cypress will automatically close the alert box whatever type it may be
    it('handling JS alert', () => {

        cy.get('[onclick="jsAlert()"]').click()
        cy.on('window:alert', (text) => {
            expect(text).contains('I am a JS Alert')
        })
        cy.get('#result').should('have.text', 'You successfully clicked an alert')

    })

    it('handling JS alert', () => {
        cy.get('button[onclick="jsAlert()"]').click()
        cy.on('window:alert', (str) => {
            expect(str).to.contains('I am a JS Alert')
        })
        cy.get('p#result').should('have.text', 'You successfully clicked an alert')
    })

    it('confirm alert - true', () => {
        cy.get('button[onclick="jsConfirm()"]').click()

        cy.on('window:confirm', (str) => {
            expect(str).to.contains('I am a JS Confirm')
        })

        cy.get('p#result').should('have.text', 'You clicked: Ok')
    })

    it('confirm alert - false', () => {
        cy.get('button[onclick="jsConfirm()"]').click()
        // cy.on('window:confirm', (str) => {
        //     expect(str).to.contains('I am a JS Confirm')
        //     //cypress will automatically accept the event and close it
        //     return false //for cancelling the event
        // })
        cy.on('window:confirm', () => false); //for cancelling the event
        cy.get('#result').should('have.text', 'You clicked: Cancel')
    })

    it('Prompt alert - ok', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        // cy.get('button[onclick="jsPrompt()"]').click()

        cy.window().then((win => {

            cy.stub(win, 'prompt').returns('Welcome')

        }))

    })


    it('Authenticated alert - method 1', () => {
        cy.visit('https://the-internet.herokuapp.com/basic_auth', { auth: { username: "admin", password: "admin" } })
        cy.get('.example > p').should('have.text', '\n    Congratulations! You must have the proper credentials.\n  ')

    })

    it('Authenticated alert - method 2', () => {
        //Include cred in url after //--- need to write username:password@ followed by url
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        cy.get('.example > p').should('have.text', '\n    Congratulations! You must have the proper credentials.\n  ')

    })

})
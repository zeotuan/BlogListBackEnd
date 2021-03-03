describe('note app', function () {
    beforeEach(function(){
        cy.request('POST','http://localhost:3001/api/testing/reset')
        const user = {
            name:'Matti',
            username:'mluukkai',
            password:'salainen'
        }
        cy.request('POST','http://localhost:3001/api/users/',user)
        cy.visit('http://localhost:3000')
    })


    it('front page can be opened ', function() {
        cy.contains('Notes')
        cy.contains('show important')
    })

    it('login can be opened', function(){
        cy.contains('login').click()
        cy.get('#usernameInput').type('mluukkai')
        cy.get('#passwordInput').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Matti logged-in')

    })

    it('login failed with wrong credential', function(){
        cy.contains('login').click()
        cy.get('#usernameInput').type('who')
        cy.get('#passwordInput').type('sailen')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain','Wrong credential')
        cy.get('html').should('not.contain','Matti logged-in')
    })

    describe('when logged-in', function(){
        beforeEach(function(){
            cy.login({username:'mluukkai', password:'salainen'})
        })

        it('a new note can be created', function(){
            cy.contains('new note').click()
            cy.get('#noteInput').type('a note created by cypress')
            cy.get('#saveNote-button').click()
            cy.contains('a note created by cypress')
        })

        describe('and a note exists', function(){
            beforeEach(function(){
                // cy.contains('new note').click()
                // cy.get('input').type('another note created by cypress')
                // cy.contains('save').click()
                cy.createNote({
                    content: 'another note cypress',
                    important: false
                })
            })

            it('note can be made important',function(){
                cy.contains('another note cypress').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain','make not important')

            })
        })
    })
    
})
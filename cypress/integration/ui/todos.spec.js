///<reference types='cypress'/>

describe('Todo UI testin', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it.only('TC-1 should add a new todo correctly', () => {
        cy.intercept('POST', 'http://localhost:8080/todos').as('postRequest')
        cy.addNewTodo("First Todo")
        cy.wait('@postRequest').then(xhr => {
            expect(xhr.request.body.name).to.eql("First Todo")
        })
        cy.get('.todo-item').last().should('contain.text', 'First Todo')
        cy.log('hello github integration')
    })

    it('TC-2 should update todo status', () => {
        cy.addNewTodo("Second Todo")
        cy.get('.todo-checkbox').check().should('be.checked')
        cy.get('.todo-checkbox').uncheck().should('be.not.checked')
    })

    it('TC-3 should delete a todo correctly', () => {
        cy.addNewTodo("Third Todo")
        cy.get('.delete-item').click()
    })

    it('TC-4 should not add an empty todo', () => {
        cy.addNewTodo("")
    })

    afterEach(() => {
        cy.get('body').then($el => {
            if ($el.find('.delete-item').length > 0) {
                cy.get('.delete-item').click({ multiple: true })
            }
        })
    })

})
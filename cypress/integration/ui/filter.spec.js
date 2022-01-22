describe('filter functionality test cases', () => {

    beforeEach(() => {
        //cy.addDummyTodos()
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8080/todos'
        }, {
            fixture: 'todos'
        })

        cy.visit('/')
        // const todosExample = ['todo1', 'todo2', 'todo3', 'todo4', 'todo5'].forEach(todo => {
        //     cy.addNewTodo(todo)
        // })
        // cy.get('.todo-checkbox').first().check().should('be.checked')
        // cy.get('.todo-checkbox').last().check().should('be.checked')
    })

    it('should filter out the complete todos correctly', () => {
        cy.contains('Complete').click()
        cy.url().should('contain', '/complete')
        cy.get('.todo-checkbox').each(element => {
            cy.wrap(element).should('be.checked')
        })
    })

    it('should filter out active todos correctly', () => {
        cy.contains('Active').click()
        cy.url().should('contain', '/active')
        cy.get('.todo-checkbox').each(element => {
            cy.wrap(element).should('not.be.checked')
        })
    })

    // after(() => {
    //     cy.visit('/')
    //     cy.get('body').then($el => {
    //         if ($el.find('.delete-item').length > 0) {
    //             cy.get('.delete-item').click({ multiple: true })
    //         }
    //     })
    // })

})
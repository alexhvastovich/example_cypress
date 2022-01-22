///<reference types='cypress'/>


describe('test all the todos using the API', () => {

    let id;


    it('should add todo using api', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/todos',
            body: {
                "name": "todo1",
                "isComplete": false
            }
        }).then(response => {
            id = response.body.id
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eql('todo1')
        })
    })

    it('should GET specific todo correctly', () => {
        cy.request('GET', 'http://localhost:8080/todos/' + id).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eql('todo1')
        })
    })

    it('should update the status of a todo correctly', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/todos/' + id,
            body: {
                "name": "todo_updated",
                "isComplete": true
            }
        }).then(response => {
            id = response.body.id
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eql('todo_updated')
        })
    })

    it('should delete a todo', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8080/todos/' + id
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})
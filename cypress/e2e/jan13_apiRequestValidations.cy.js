//API testing methods:
 
describe('Methods of handling request',() => {
    it('GET',()=>{
        cy.request({
            method : "GET",
            url: "https://automationexercise.com/api/productsList"
        }).then((getResponse) => {
            const getResponseBody = JSON.parse(getResponse.body)
            expect(getResponseBody.responseCode).to.be.equal(200)
            expect(getResponseBody.products.category.usertype.usertype).equals('Women')
 
        })
    })
 
    it('POST',()=>{
        cy.request({
            method : "POST",
            url: "https://automationexercise.com/api/searchProduct",
            form:true,   // if we are passing data as a form of form-data
            body:{
                'search_product' : 'tshirt'
            }
        }).then((postResponse) => {
            const postResponseBody = JSON.parse(postResponse.body)
            expect(postResponseBody.responseCode).to.equals(200)
        })
    })
 
    it('PUT',()=>{
        cy.request({
            method : "PUT",
            url : "https://automationexercise.com/api/updateAccount",
            form:true,  
            body:{
                "name" : "Demo test",
                "email" : "ashrith999@gmail.com",
                "password" : "#ash@123r",
                "title" : "Mr",
                "birth_date" : "12",
                "birth_month" : "Jan",
                "birth_year" : "1990"
            }
        }).then((putResponse) => {
            const putResponseBody = JSON.parse(putResponse.body)
            console.log(putResponseBody)
            expect(putResponseBody.responseCode).to.equals(200)
        })
    })
 
    it.skip('DELETE',()=>{
        cy.request({
            method : "DELETE",
            url : "https://automationexercise.com/api/verifyLogin",
            form:true,
            body: {
               
            }
        }).then((delResponse) => {
            const delResponseBody = JSON.parse(delResponse.body)
            expect(delResponseBody.responseCode).to.equals(200)
        })
    })
})
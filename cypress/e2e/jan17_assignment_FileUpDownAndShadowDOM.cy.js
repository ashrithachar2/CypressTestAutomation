describe("File Upload",()=>{

let fileName =  '"sampleTestData.txt"'
let fixtureFileName  = '"mock.json"';

beforeEach(()=>{

    cy.fixture("../../fixtures/uploadAndDownloadFileTestData.json").then( function(uploadAndDownloadFileTestData){
        this.uploadAndDownloadFileTestData = uploadAndDownloadFileTestData;
    })
})

it("File Upload Validation", function(){

cy.visit(this.uploadAndDownloadFileTestData.fileUploadUrl)

//Uploading file through fixture using .attachFile()
    cy.get("#file_upload").as("uploadBtn").attachFile('../../fixtures/'+ this.uploadAndDownloadFileTestData.fixturPath).then(()=>{

    cy.get('button[type="submit"]').click()
    cy.get("#file_upload_response").should("contain.text", "You have successfully uploaded"  + " " + fixtureFileName );

})

//Uploading file through system path using .selectFile()
    cy.get("@uploadBtn").selectFile(this.uploadAndDownloadFileTestData.filePath).then(()=>{

    cy.get('button[type="submit"]').click()
    cy.get("#file_upload_response").should("contain.text", "You have successfully uploaded"  + " " + fileName);
})
})


it("File Download Validation", function(){

    cy.downloadFile(this.uploadAndDownloadFileTestData.fileDownloadUrl,this.uploadAndDownloadFileTestData.downloadFolder,
        this.uploadAndDownloadFileTestData.downloadFileName)

})

it("Handling Shadow DOM elements", function(){

    cy.visit(this.uploadAndDownloadFileTestData.shadowDomUrl);

    cy.get(".container h1").should("be.visible").and("have.text", "Shadow DOM page for Automation Testing Practice").then(()=>{

        cy.shadowMethod("#shadow-host").within(()=>{

            cy.get('button[type="button"]').should("have.text", "This button is inside a Shadow DOM.")

            
        })

    })

})


it.only("Handling Shadow DOM elements", function(){

    cy.visit("https://the-internet.herokuapp.com/shadowdom");

    cy.get("#content h1").should("be.visible").and("have.text", "Simple template").then(()=>{

        cy.shadowMethod("div my-paragraph").eq(0).invoke("text").then(()=>{

            cy.get('span[slot="my-text"]').should("have.text", "Let's have some different text!")

            
        })

    })

})

})
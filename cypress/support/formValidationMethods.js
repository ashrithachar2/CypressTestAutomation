export const checkColorValues = (colorsValues) => {

    for (let i = 0; i < colorsValues.length; i++) {

        cy.get("select#colors  option").eq(i).should("contain.text", colorsValues[i])

    }
}

export const checkArraySort = () => {

    cy.get("select#animals  option").then(($animals) => {

        let originalArray = [...$animals].map((animal) =>

            animal.textContent.trim()
        )

        let sortedArray = [...originalArray].sort();

        expect(originalArray).to.deep.equal(sortedArray)
    })
}

export const selectDateThroughDatePicker = ((year, day, date) => {

    //Enter date values in date picker by using prev and next button and select() method
    cy.get("#txtDate").scrollIntoView().as("dateField").click().then(() => {
        cy.get("#ui-datepicker-div").find('a[data-handler="prev"]').as("PrevButton").click();
        cy.get("@PrevButton").click();

        //Select year and date
        cy.get("select.ui-datepicker-year").select(year)
        cy.get("tr td a[data-date=" + day + "]").click()

        //check date value
        cy.get("@dateField").should("have.value", date)

    })

})



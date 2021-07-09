/// <reference types="@testing-library/cypress" />

const TestCakeName = "Automated Test Cake " + Date.now();

describe("Can access the app running locally", () => {

    it("Loads up a page, and we can see the title 'cakes'", () => {
        cy.visit("http://localhost:3030");
        cy.findByText("Cakes").should('exist');
    });

    it("Lets me add a cake", () => {
        cy.visit("http://localhost:3030");
        let addButton = cy.findByRole("button", {
            name: "+ Add a cake"
        }).click();
        cy.findByLabelText(/Name/i).type(TestCakeName);
        cy.findByLabelText(/Comment/i).type("A comment on how delicious automated testing is");
        cy.findByLabelText(/image Url/i).type("https://via.placeholder.com/400x300.png");
        cy.findByLabelText(/yum factor/i).select("3");
        let saveButton = cy.findByRole("button", {
            name: /save/i
        }).click();
        cy.findByText(/your cake has been added/i);
        let doneButton = cy.findByRole("button", {
            name: /done/i
        }).click();
    })

    it("Lets me delete the cake I just added", () => {

        cy.visit("http://localhost:3030");
        cy.findByText(TestCakeName).closest("div.card").findByRole("button", {
            name: /delete/i
        }).click();

        cy.findByText(/are you sure/i).closest("div.modal").findByRole("button", {
            name: /delete/i
        }).click();

        cy.findByText(/has been deleted/i).should('exist');

        cy.findByRole("button", {
            name: /done/i
        }).click();

        cy.findByText(TestCakeName).should('not.exist');
    })


})
describe("Can access the app running locally", () => {
    it("Loads up a page, and we can see the title 'cakes'", () => {
        cy.visit("http://localhost:3030");
        cy.findByText("Cakes").should('exist');
    })


})
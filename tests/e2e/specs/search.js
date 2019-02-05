
context('Search', ()=>{
    context('Toogle Search File', ()=>{
        beforeEach(()=>{
            cy.visit('/#sessions');
        });

        it('should does not show text-box', ()=>{
            cy.get('[data-cy=search-input]').should('not.be.visible');
        });

        it('should show text after clicking search button', ()=>{
            cy.get('[data-cy=btn-search]').click();
            cy.get('[data-cy=search-input]').should('be.visible');
        });

        it('should hide search text after clicking search button twice', ()=>{
            cy.get('[data-cy=btn-search]').click();
            cy.get('[data-cy=search-input]').should('be.visible');
            cy.get('[data-cy=btn-search]').click();
            cy.get('[data-cy=search-input]').should('not.be.visible');
        });

    });
});
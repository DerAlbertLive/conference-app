context('Search', () => {
  context('Toogle Search File', () => {
    beforeEach(() => {
      cy.visit('/#sessions');
    });

    it('should does not show text-box', () => {
      cy.get('[data-cy=search-input]').should('not.be.visible');
    });

    it('should show text after clicking search button', () => {
      cy.get('[data-cy=btn-search]').click();
      cy.get('[data-cy=search-input]').should('be.visible');
    });

    it('should hide search text after clicking search button twice', () => {
      cy.get('[data-cy=btn-search]').click();
      cy.get('[data-cy=search-input]').should('be.visible');
      cy.get('[data-cy=btn-search]').click();
      cy.get('[data-cy=search-input]').should('not.be.visible');
    });

    describe('on searching for assembly', () => {
      beforeEach(() => {
        cy.get('[data-cy=btn-search]').click();
        cy.get('[data-cy=search-input]').should('be.visible');
        cy.get('[data-cy=search-input]').type('asseMBLY');
      });
      it('first shoud be 09:30 - 10:30', () => {
        cy.contains('[data-cy=group-0] [data-cy=title]', '09:30 - 10:30');
      });
      it('second shoud be 11:00 - 12:00', () => {
        cy.contains('[data-cy=group-1] [data-cy=title]', '11:00 - 12:00');
      });

      it('first title contains Webs', () => {
        cy.contains('[data-cy=group-0]', 'Web');
      });
  
      it('second should contains Blazor', () => {
        cy.contains('[data-cy=group-1]', 'Blazor');
      });
    });
  });
});

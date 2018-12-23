// https://docs.cypress.io/api/introduction/api.html

context('Speakers', () => {
  beforeEach(() => { 
    cy.visit('/speakers')
  });

  describe('Speaker test', () => {
    it('Visits the Favorite  url', () => {
      cy.contains('h2', 'Sprecher');
    });

    it('Should has the group Titles on the Page', () => {
      cy.get('[data-cy=group-0] h3').should('have.text', 'A')
    });

    it('Should has the group Titles on the Page', () => {
      cy.get('[data-cy=group-1] h3').should('have.text', 'B')
    });

    it('Should state Adam Ralph as the first <p/>', () => {
      cy.contains('[data-cy=group-0] [data-cy=info-0] [data-cy=name]', 'Adam Ralph');
    });

    it('Should state Anna Zietlow as last <p/>', () => {
      cy.contains('[data-cy=group-0] [data-cy=info-3] [data-cy=name]', 'Anna Zietlow');
    });

    it('Should state Björn Pasch as the first <p/>', () => {
      cy.contains('[data-cy=group-1] [data-cy=info-0] [data-cy=name]', 'Björn Pasch');
    });  

    it('Should state Christian Liebel as the first <p/>', () => {
      cy.contains('[data-cy=group-2] [data-cy=info-0] [data-cy=name]', 'Christian Liebel');
    }); 
  });
});

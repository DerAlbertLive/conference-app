// https://docs.cypress.io/api/introduction/api.html

describe('Root Navigation', () => {
  it('Visits the Favorite  url', () => {
    cy.visit('/');
    cy.contains('h2', 'Favoriten');
  });

  it('Visits the Sessions  url', () => {
    cy.visit('/#sessions');
    cy.contains('h2', 'Sessions');
  });

  it('Visits the About  url', () => {
    cy.visit('/#about');
    cy.contains('h2', 'Über');
  });

  it('Visits the Information  url', () => {
    cy.visit('/#information');
    cy.contains('h2', 'Information');
  });

  it('Visits the Speakers  url', () => {
    cy.visit('/#speakers');
    cy.contains('h2', 'Sprecher');
  });

  it('Should has dotnet Cologne 2018 in header', () => {
    cy.visit('/#about');
    cy.contains('header', 'dotnet Cologne 2018');
  });

  describe('navigation with the back chevron', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should be on the favorites page', ()=> {
      cy.url().should('include', '/#/favorite')
    })

    it('should be on the session page after click', ()=>{
      cy.get('[data-cy=link-sessions').click();
      cy.url().should('include', '/#/sessions')
    })

    it('should be on the session page after click', ()=>{
      cy.get('[data-cy=link-sessions').click();
      cy.url().should('include', '/#/sessions')
      cy.get('[data-cy=link-back').click();
      cy.url().should('include', '/#/favorite')
    })
  });
});

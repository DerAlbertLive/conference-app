// https://docs.cypress.io/api/introduction/api.html

context('Speakers', () => {
  beforeEach(() => {
    cy.visit('/speakers');
  });

  describe('Speaker test', () => {
    it('Visits the Favorite  url', () => {
      cy.contains('h2', 'Sprecher');
    });

    it('Should state Albert Weinert within first <p/>', () => {
      cy.contains('.speakerInfo p:first-of-type', 'Albert Weinert');
    });

    it('Should has the img src as the speaker image', () => {
      cy.get('img:first-of-type').should(
        'have.attr',
        'src',
        'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/26',
      );
    });

    it('Should has the group Titles on the Page', () => {
      cy.get(':nth-child(2) > h3').should('have.text', 'Group A');
    });
  });
});

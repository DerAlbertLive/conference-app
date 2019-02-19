import { cyan } from 'ansi-colors';

context('Information', () => {
  beforeEach(() => {
    cy.visit('/#sessions');
    cy.get('[data-cy=link-information] > svg').click();
  });

  describe('navigation', () => {
    it('should be on the information page', () => {
      cy.url().should('include', '/#/information');
    });
  });

  describe('content', () => {
    it('should has Information as the title', () => {
      cy.contains('h2', 'Information');
    });

    it('first definition should be address', () => {
        cy.contains('dl > :nth-child(1)', "Veranstaltungsort")
        cy.contains('address', "KOMED")
        cy.contains('address', "MediaPark")
        cy.contains('address', "50670")
        cy.get('address').find('br').should('have.length', 2);
    })

    it('second definition should be Anfahrt', () => {
        cy.contains('dl > :nth-child(3)', "Anfahrt")
        cy.get('dl > :nth-child(4) > a')
            .should("have.attr", "href", "https://www.komed-veranstaltungen.de/standort/anfahrt/")
        cy.contains('dl > :nth-child(4)', "Zum Komed");
    })
    it('third definition should be Website', () => {
        cy.contains('dl > :nth-child(5)', "Website")
        cy.get('dl > :nth-child(6) > a')
            .should("have.attr", "href", "https://www.dotnet-cologne.de")
        cy.contains('dl > :nth-child(6)', "dotnet-cologne.de");
    })
    it('third definition should be Twitter', () => {
        cy.contains('dl > :nth-child(7)', "Twitter")
        cy.get('dl > :nth-child(8) > a')
            .should("have.attr", "href", "https://twitter.com/dotnetcologne")
        cy.contains('dl > :nth-child(8)', "twitter.com");
    })
    it('fourth definition should be Hashtag', () => {
        cy.contains('dl > :nth-child(9)', "Hashtag");
        cy.get('dl > :nth-child(10) > a')
            .should("have.attr", "href", "https://twitter.com/hashtag/dncgn?src=hash")
        cy.contains('dl > :nth-child(10)', "#dncgn");
    })

  });
});

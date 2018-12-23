// https://docs.cypress.io/api/introduction/api.html

context('Speaker', () => {
  beforeEach(() => {
    cy.visit('/speakers');
  });

  context('Selection of Adam Ralph', () => {
    beforeEach(() => {
      cy.contains('[data-cy=name]', 'Adam Ralph').click();
    });
    describe('A test', () => {
      it('should load page of Adam Ralph', () => {
        cy.contains('h2', 'Adam Ralph');
      });
      it('should has the bio of Adam in the page', () => {
        cy.contains('[data-cy=bio]', 'NServiceBus');
      });
      it('should has session of .NET Standard', () => {
        cy.contains('[data-cy=info-0]', 'Standard');
      });
      it('should has session of Service Boundaries', () => {
        cy.contains('[data-cy=info-1]', 'service');
      });
    });
  });

  context('Selection of Don Wibier', () => {
    beforeEach(() => {
      cy.contains('[data-cy=name]', 'Don Wibier').click();
    });
    describe('A test', () => {
      it('should load page of Don Wibier', () => {
        cy.contains('[data-cy=name]', 'Don Wibier');
      });
      it('should has the bio of Don in the page', () => {
        cy.contains('[data-cy=bio]', 'Clipper');
      });
      it('should has session of Voice Chat', () => {
        cy.contains('[data-cy=info-0]', 'Keyboard');
      });
    });
  });

  context('Selection of Sia Ghassemi', () => {
    beforeEach(() => {
      cy.contains('[data-cy=name]', 'Sia Ghassemi').click();
    });

    describe('A test', () => {
      it('should load page of Sia Ghassemi', () => {
        cy.contains('[data-cy=name]', 'Sia Ghassemi');
      });

      it('should has the bio of Sia in the page', () => {
        cy.contains('[data-cy=bio]', 'Siavash Ghassemi');
      });

      it('should has session of Azure Function 101', () => {
        cy.contains('[data-cy=info-0]', 'Was sind');
      });

      it('should has session of CQRS in Xamarin', () => {
        cy.contains('[data-cy=info-1]', 'CQRS');
      });

      it('should has session of Azure Function Deep Dive', () => {
        cy.contains('[data-cy=info-2]', 'Deep Dive');
      });
    });
  });
});

context('Sessions', () => {
  beforeEach(() => {
    cy.visit('/sessions');
  });
      
  describe('group titles', () => {
    it('first shoud be 09:00 - 9:15', () => {
      cy.contains('[data-cy=group-0] [data-cy=title]', '09:00 - 09:15');
    });
    it('second shoud be 09:30 - 10:30', () => {
      cy.contains('[data-cy=group-1] [data-cy=title]', '09:30 - 10:30');
    });
    it('sixed shoud be 14:20 - 15:20', () => {
      cy.contains('[data-cy=group-5] [data-cy=title]', '14:20 - 15:20');
    });
  });
  describe('first slot has sessions', () => {
    it('first session should be begrüßung', () => {
      cy.contains(
        '[data-cy=group-0] [data-cy=info-0] [data-cy=title]',
        'Begrüßung',
      );
    });
    it('first session should have speakerNames', () => {
      cy.contains(
        '[data-cy=group-0] [data-cy=info-0] [data-cy=names]',
        'Albert Weinert, Melanie Eibl, Stefan Lange',
      );
    });
  });
  describe('third slot has sessions', () => {
    it('first session should be WebAssembly', () => {
      cy.contains(
        '[data-cy=group-2] [data-cy=info-0] [data-cy=title]',
        'WebAssembly',
      );
    });
    it('first session should have speakerNames', () => {
      cy.contains(
        '[data-cy=group-2] [data-cy=info-0] [data-cy=names]',
        'Rainer Stropek',
      );
    });

    it('third session should be Progressive ', () => {
      cy.contains(
        '[data-cy=group-2] [data-cy=info-2] [data-cy=title]',
        'Progressive ',
      );
    });

    it('last session should be Checkliste  ', () => {
      cy.contains(
        '[data-cy=group-2] [data-cy=info-6] [data-cy=title]',
        'Checkliste',
      );
    });

    it('tracks should be in order a,b,c,d,e,f,g', () => {
      cy.contains('[data-cy=group-2] [data-cy=info-0] [data-cy=track]', 'A');
      cy.contains('[data-cy=group-2] [data-cy=info-1] [data-cy=track]', 'B');
      cy.contains('[data-cy=group-2] [data-cy=info-2] [data-cy=track]', 'C');
      cy.contains('[data-cy=group-2] [data-cy=info-3] [data-cy=track]', 'D');
      cy.contains('[data-cy=group-2] [data-cy=info-4] [data-cy=track]', 'E');
      cy.contains('[data-cy=group-2] [data-cy=info-5] [data-cy=track]', 'F');
      cy.contains('[data-cy=group-2] [data-cy=info-6] [data-cy=track]', 'G');
    });
  });
  describe('navigation to first WebAssembly', () => {
    beforeEach(() => {
      cy.contains('[data-cy=group-1] [data-cy=info-0]', 'Web Assembly').click();
    });
    it('should navigation to the ', () => {
      cy.contains('[data-cy=title]', 'Web Assembly');
    });

    it('should has Floarin Bender as speaker', () => {
      cy.contains('[data-cy=speakers]', 'Florian Bader');
    });
  });

  describe('navigation to second Web Assembly', () => {
    beforeEach(() => {
      cy.contains('[data-cy=group-2] [data-cy=info-0]', 'WebAssembly').click();
    });
    it('should navigation to the ', () => {
      cy.contains('[data-cy=title]', 'WebAssembly');
    });
    it('should has rainer stropek as speaker', () => {
      cy.contains('[data-cy=speakers]', 'Rainer Stropek');
    });
  });

  describe('favorite toogles', () => {
    it('should toogle first session', () => {
      cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav] > svg').should(
        'have.class',
        'favorite',
      );
    });
    it('should toogle first session twice', () => {
      cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav] > svg').should(
        'not.have.class',
        'favorite',
      );
    });

    it('should toogle first session in third group', () => {
      cy.get('[data-cy=group-2] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-2] [data-cy=info-0] [data-cy=fav] > svg').should(
        'have.class',
        'favorite',
      );
    });
    it('should toogle first session twice in third group', () => {
      cy.get('[data-cy=group-2] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-2] [data-cy=info-0] [data-cy=fav]').click();
      cy.get('[data-cy=group-2] [data-cy=info-0] [data-cy=fav] > svg').should(
        'not.have.class',
        'favorite',
      );
    });
  });

  describe('on a selected session', () => {
    it('should display a favorite symbol', () => {
      cy.get('[data-cy=group-0] [data-cy=info-0]').click();
      cy.get('[data-cy=fav]');
    });
    it('should should be a favorite after click', () => {
      cy.get('[data-cy=group-0] [data-cy=info-0]').click();
      cy.get('[data-cy=fav]').click();
      cy.get('[data-cy=fav]').should('have.class', 'favorite');
    });
    it('should not be a favorite after two click click', () => {
        cy.get('[data-cy=group-0] [data-cy=info-0]').click();
        cy.get('[data-cy=fav]').click();
        cy.get('[data-cy=fav]').should('have.class', 'favorite');
        cy.get('[data-cy=fav]').click();
        cy.get('[data-cy=fav]').should('not.have.class', 'favorite');
      });
  
  });
});

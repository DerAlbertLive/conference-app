
context('Sessions', ()=>{
    beforeEach(()=>{
        cy.visit('/sessions');
    });

    describe('group titles', ()=> {
        it('first shoud be 09:00 - 9:15',()=>{
            cy.contains('[data-cy=group-0] [data-cy=title]', '09:00 - 09:15');
        })
        it('second shoud be 09:30 - 10:30',()=>{
            cy.contains('[data-cy=group-1] [data-cy=title]', '09:30 - 10:30');
        })
        it('sixed shoud be 14:20 - 15:20',()=>{
            cy.contains('[data-cy=group-5] [data-cy=title]', '14:20 - 15:20');
        })
    });
    describe('first slot has sessions', ()=> {
        it('first session should be begrüßung', ()=> {
            cy.contains('[data-cy=group-0] [data-cy=info-0] [data-cy=title]', 'Begrüßung')
        })
    })
    describe('third slot has sessions', ()=> {
        it('first session should be WebAssembly', ()=> {
            cy.contains('[data-cy=group-2] [data-cy=info-0] [data-cy=title]', 'WebAssembly')
        })

        it('third session should be Progressive ', ()=> {
            cy.contains('[data-cy=group-2] [data-cy=info-2] [data-cy=title]', 'Progressive ')
        })

        it('last session should be Checkliste  ', ()=> {
            cy.contains('[data-cy=group-2] [data-cy=info-6] [data-cy=title]', 'Checkliste')
        })

        it('tracks should be in order a,b,c,d,e,f,g', ()=> {
            cy.contains('[data-cy=group-2] [data-cy=info-0] .track', 'A');
            cy.contains('[data-cy=group-2] [data-cy=info-1] .track', 'B');
            cy.contains('[data-cy=group-2] [data-cy=info-2] .track', 'C');
            cy.contains('[data-cy=group-2] [data-cy=info-3] .track', 'D');
            cy.contains('[data-cy=group-2] [data-cy=info-4] .track', 'E');
            cy.contains('[data-cy=group-2] [data-cy=info-5] .track', 'F');
            cy.contains('[data-cy=group-2] [data-cy=info-6] .track', 'G');
        })        
    })

});
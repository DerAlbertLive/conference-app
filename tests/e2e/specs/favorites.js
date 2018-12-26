context("Favorites", ()=>{
    beforeEach(()=> {
        cy.visit('/sessions')
        cy.get('[data-cy=group-0] [data-cy=info-0] [data-cy=fav]').click();
        cy.get('[data-cy=group-1] [data-cy=info-0] [data-cy=fav]').click();
        cy.get('[data-cy=group-1] [data-cy=info-3] [data-cy=fav]').click();
        cy.get('[data-cy=group-3] [data-cy=info-1] [data-cy=fav]').click();
        cy.get('[data-cy=group-3] [data-cy=info-3] [data-cy=fav]').click();
        cy.visit('/')
    });

    describe('group titles', ()=> {
        it('first shoud be 09:00 - 9:15',()=>{
            cy.contains('[data-cy=group-0] [data-cy=title]', '09:00 - 09:15');
        })
        it('second shoud be 09:30 - 10:30',()=>{
            cy.contains('[data-cy=group-1] [data-cy=title]', '09:30 - 10:30');
        })
        it('sixed shoud be 12:15 - 13:15',()=>{
            cy.contains('[data-cy=group-2] [data-cy=title]', '12:15 - 13:15');
        })
    });
    

    describe('session titles should there', ()=> {
        it('first should contins Begrüßung',()=>{
            cy.contains('[data-cy=group-0]', 'Begrüßung');
        })
        
        it('second should contains Web Assemlby and ASP.NET',()=>{
            cy.contains('[data-cy=group-1]', 'Web Assembly');
            cy.contains('[data-cy=group-1]', 'ASP.NET Core 2');
        })

        it('sixed shoud contains Challanges und Debugging',()=>{
            cy.contains('[data-cy=group-2]', 'Challenges');
            cy.contains('[data-cy=group-2]', 'Debugging');
        })
    });

})
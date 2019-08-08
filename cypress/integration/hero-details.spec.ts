describe('Hero details', () => {
  it(`should edit name`, () => {
    cy.visit('detail/11');

    cy.server();
    cy.route({
      method: "PUT",
      url: '/api/heroes/11',
      response: { id: 11, name: 'Spider Pig' }
    }).as('hero11update');

    cy.get('input').should('have.value', 'Mr. Nice');

    // cy.get('input').invoke('val').then((val) => {
    //   expect(val).to.equal('Mr. Nice');
    // })

    cy.get('input').clear().type('Spider Pig');
    cy.get('h2').first().should('contain', 'SPIDER PIG');
    cy.contains('save').click();
    cy.wait('@hero11update');
  })
})
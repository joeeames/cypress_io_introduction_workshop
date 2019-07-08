describe('Heroes Page', () => {

  beforeEach(() => {
    cy.server();
    cy.setupServerResponses();
    cy.route({
      method: "POST",
      url: '/api/heroes',
      response: { "id": 21, "name": "Superbob" }
    })

  })

  it(`has the right header`, () => {
    cy.visit('heroes');
    cy.get('h1').contains('Tour of Heroes');
    cy.get('nav').contains('Dashboard')
    cy.get('nav').contains('Heroes')
    cy.get('h2').contains('My Heroes')
  })

  it(`adds and deletes heroes when created`, () => {
    cy.get('input').type('superbob');
    cy.contains('add').click();
    cy.get('ul li').should('have.length', 11);
    cy.contains('21').parent().find('button.delete').click();
    cy.get('ul li').should('have.length', 10)
      .last().contains('Tornado');
  })


})

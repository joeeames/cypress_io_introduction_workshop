describe('Heroes Page', () => {

  beforeEach(() => {
    cy.server();
    cy.route('/api/heroes').as('heroes');
  })

  it(`finds the right hero`, () => {
    cy.visit('dashboard');
    // just adding this fixes the issue, but this is clunky
    cy.get('div.module')
    cy.get('input').type('bo')
    cy.get('ul li').should('have.length', 1);
  })

  it(`finds the right hero - with wait`, () => {
    cy.visit('dashboard');
    cy.wait('@heroes');
    // since the event occurs twice (once on dashboard, once on search)
    // we need to wait twice to make sure we get the proper request
    // not a great architecture...
    cy.wait('@heroes');

    cy.get('input').type('bo')
    cy.get('ul li').should('have.length', 1);
  })



})

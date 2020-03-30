describe('Heroes Page', () => {

  beforeEach(() => {
  })

  it(`finds the right hero`, () => {
    cy.visit('dashboard');
    cy.get('input').type('bo')
    cy.get('ul li').should('have.length', 1);
  })



})

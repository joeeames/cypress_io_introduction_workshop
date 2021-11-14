describe('hero Details Page', () => {

  beforeEach(() => {
    cy.intercept({
      method: "PUT",
      url: '/api/heroes/11'},
      { "id": 11, "name": "Mr. Mean" }
    )
    cy.intercept({
      method: "GET",
      url: '/api/heroes'},
      [
        { id: 11, name: 'Mr. Mean' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ]
    )
    cy.visit('detail/11');
  })

  
  it(`can update a Hero's Name`, () => {
    cy.get('input').clear().type('Mr. Mean');
    cy.contains('save').click();
    cy.visit('dashboard')
    cy.get('input').type('Mean').get('.search-result li').should('have.length', 1);
  })

})
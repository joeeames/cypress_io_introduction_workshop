// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


declare namespace Cypress {
  interface Chainable<Subject> {
    setupServerResponses(heroes?: Object[]): Chainable<Subject>,
    visitAndSeed(params?: {path?: string, heroes?: Object[]}): Chainable<Subject>,
    searchForHero(heroName?: string): Chainable<Subject>
  }
}

Cypress.Commands.add("searchForHero", 
  ( heroName = "Mr. Nice") => {
    cy.get('#search-box').type('Mr. Nice');
  }
)

Cypress.Commands.add("visitAndSeed", 
  (
    {
      path = 'dashboard',
      heroes = [
        { id: 11, name: 'Mr. Nice' },
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
    } = {}
  ) => {
    cy.server();

    cy.route({
      method: "GET",
      url: '/api/heroes',
      response: heroes
    })
    cy.visit(path);
})


Cypress.Commands.add("setupServerResponses", 
    (
      heroes = [
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
    ) => {
  
  cy.server();

  cy.route({
    method: "GET",
    url: '/api/heroes',
    response: heroes
  })

})



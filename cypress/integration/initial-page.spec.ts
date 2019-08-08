/// <reference types="cypress" />

describe('dashboard', () => {
  describe('standard data', () => {

    beforeEach(() => {
      cy.visit("/dashboard");
    })

    it(`true is true`, () => {
    })

    it(`has title 'Tour of Heroes'`, () => {
      cy.get('h1').should('contain', 'Tour of Heroes');
      cy.title().should('eq', 'Tour of Heroes');
      // cy.contains('Tour of Heroee');
    })

    it(`has title 'Tour of Heroes' with promise`, () => {
      cy.get('h1').then(h5 => {
        console.log('H5: ' + h5);
      });
    })

    it(`has the correct headers`, () => {
      cy.contains('Dashboard');
      cy.get('nav a').eq(1).should('contain', 'Heroes');
      cy.contains('Top Heroes');
    })

    it(`has the correct search header`, () => {
      cy.contains('Hero Search');
      cy.get('app-hero-search h4').should('contain', 'Hero Search');
    })

    it(`has correct basic info`, () => {
      cy.get('h1').should('contain', Cypress.env('defaultTitle'));
      cy.title().should('eq', Cypress.env('defaultTitle'));
      // cy.contains('Tour of Heroee');

      cy.contains('Dashboard');
      cy.get('nav a').as('Dashboardlinks');
      // cy.get('@Dashboardlinks').eq(1).should('contain', 'Heroes');
      // cy.get('@Dashboardlinks').eq(0).should('contain', 'Dashboard');
      cy.get('@Dashboardlinks').last().should('contain', 'Heroes');
      cy.get('@Dashboardlinks').first().should('contain', 'Dashboard');

      cy.get('@Dashboardlinks').first().contains('Dashboard')
        .parent().get('a').last().contains('Heroes');

      cy.contains('Top Heroes');
      cy.contains('Hero Search');
      cy.get('app-hero-search h4').should('contain', 'Hero Search');
    })

    it(`can search`, () => {
      cy.get('#search-box').type('na');
      cy.get('.search-result li').should('have.length', 3);
      cy.get('#search-box').type('{backspace}');
      cy.get('.search-result li').should('have.length', 6)
        .first().contains('Narco');
      cy.get('.search-result li').contains('Mr. Nice').click();
      cy.url().should('include', 'detail/11');
    })
  })

  it(`should have one box with one hero`, () => {
    cy.server();
    cy.route({
      method: "GET",
      url: '/api/heroes',
      response: 'fixture:singleHero'
    });
    cy.visit("/dashboard");
    cy.get('.module.hero').should('have.length', 1);
  })
  
  it(`should have two boxes with two heroes`, () => {
    cy.server();
    cy.route({
      method: "GET",
      url: '/api/heroes',
      response: 'fixture:twoHeroes'
    });
    cy.visit("/dashboard");
    cy.get('.module.hero').should('have.length', 2);
  })
})

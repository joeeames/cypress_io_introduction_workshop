/// <reference types="cypress" />

describe('dashboard', () => {
  
  it(`true is true`, () => {
  })
  
  it(`has title 'Tour of Heroes'`, () => {
    cy.visit("localhost:4200/dashboard");
    cy.get('h1').should('contain', 'Tour of Heroes');
    cy.title().should('eq', 'Tour of Heroes');
    // cy.contains('Tour of Heroee');
  })
  
  it(`has title 'Tour of Heroes' with promise`, () => {
    cy.visit("localhost:4200/dashboard");
    cy.get('h1').then(h5 => {
      console.log('H5: ' + h5);
    });
  })
  
  it(`has the correct headers`, () => {
    cy.visit("localhost:4200/dashboard");
    cy.contains('Dashboard');
    cy.get('nav a').eq(1).should('contain', 'Heroes');
    cy.contains('Top Heroes');
  })
  
  it(`has the correct search header`, () => {
    cy.visit("localhost:4200/dashboard");
    cy.contains('Hero Search');
    cy.get('app-hero-search h4').should('contain', 'Hero Search');
  })
})

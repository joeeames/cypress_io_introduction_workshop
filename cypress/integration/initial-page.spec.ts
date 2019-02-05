/// <reference types="Cypress" />




  describe('Initial page', () => {

    beforeEach(() => {
      
    })

    it(`has title 'Tour of Heroes'`, () => {
      // expect(browser.getTitle()).toEqual('Tour of Heroes');
      cy.visit('http://localhost:4200/dashboard');
      cy.title()
        .should('eq', 'Tour of Heroes')

    });

    it(`has h1 'Tour of Heroes'`, () => {
      // expectHeading(1, expectedH1);
      cy.visit('http://localhost:4200/dashboard');
      cy.get('h1')
        .contains('Tour of Heroes')
        // be good to have them add this, and struggle a little bit, finding out that it uses rgb. give them a hint about using spaces
        .and('have.css', 'color', 'rgb(153, 153, 153)' )
    });

    it(`has 4 heroes displaying`, () => {
      cy.visit('http://localhost:4200/dashboard');
      cy.get('app-dashboard a').should('have.length', 4);
    })

    it('should fake out data', () => {
      cy.server();
      cy.route({
        method: "GET",
        url: '/api/heroes',
        response: [
          { "id": 42, "name": "Everything" },
          { "id": 43, "name": "Everything2" }
        ]
      })
      cy.visit('http://localhost:4200/dashboard');
      cy.get('app-dashboard a').should('have.length', 1);
    })

    // const expectedViewNames = ['Dashboard', 'Heroes'];
    // it(`has views ${expectedViewNames}`, () => {
    //   let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
    //   expect(viewNames).toEqual(expectedViewNames);
    // });

    // it('has dashboard as the active view', () => {
    //   let page = getPageElts();
    //   expect(page.appDashboard.isPresent()).toBeTruthy();
    // });

  });
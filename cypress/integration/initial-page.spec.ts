/// <reference types="Cypress" />




  describe('Initial page', () => {

    beforeEach(() => {
      cy.visit('dashboard');
      cy.get('nav a').first().as('dashboardlink')
      cy.get('nav a').last().as('heroeslink')

    })

    it(`has title 'Tour of Heroes'`, () => {
      // expect(browser.getTitle()).toEqual('Tour of Heroes');
      cy.title()
        .should('eq', 'Tour of Heroes')

    });

    it(`has h1 'Tour of Heroes'`, () => {
      // expectHeading(1, expectedH1);
      cy.get('h1')
        .contains('Tour of Heroes')
        // be good to have them add this, and struggle a little bit, finding out that it uses rgb. give them a hint about using spaces
        .and('have.css', 'color', 'rgb(153, 153, 153)' )
    });

    it(`has the title of 'my heroes'`, () => {
      cy.get('h3').contains('Top Heroes');
    })
    
    it(`has the title of 'Hero Search'`, () => {
      cy.get('h4').contains('Hero Search');
    })

    it(`has a dashboard & heroes view link`, () => {
      // method 1
      // cy.get('nav a').first().contains('Dashboard').parent()
      //   .get('a').last().contains('Heroes');

      // method 2
      // cy.get('nav a').as('views');
      // cy.get('@views').first().contains('Dashboard');
      // cy.get('@views').last().contains('Heroes');

      // method 3
      // put the following 2 into the beforeEach()
      cy.get('@dashboardlink').contains('Dashboard');
      cy.get('@heroeslink').contains('Heroes');

    })


    describe('heroes cards', () => {

      it(`has 4 heroes displaying`, () => {
        cy.get('app-dashboard a').should('have.length', 4);
      })
  
      it(`has the module and hero classes`, () => {
        cy.get('app-dashboard a div').should('have.class', 'module').and('have.class', 'hero')
      })

    });

    describe.only('search box', () => {
      it('displays matching results when text is input', () => {
        cy.get('#search-box').type('Mr. Nice');
        cy.get('.search-result li').contains('Mr. Nice').click();
        cy.url().should('include', '/detail/11')
      })
    })

    describe('messages', () => {
      it('clears values when clear is clicked', () => {
        cy.contains('clear').click();
        cy.get('app-messages div div').should('have.length', 0);
      })
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
      cy.visit('dashboard');
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
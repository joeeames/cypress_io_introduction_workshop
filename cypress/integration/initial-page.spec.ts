describe('Initial page', () => {

  beforeEach(() => {
    // cy.visit('dashboard')
    

  })

  it(`has title 'Tour of Heroes'`, () => {
    
    cy.visitAndSeed();
    cy.title()
      .should('eq', 'Tour of Heroes')

  });

  it(`has h1 'Tour of Heroes'`, () => {
    cy.visitAndSeed();
    cy.get('h1')
      .contains('Tour of Heroes')
      // be good to have them add this, and struggle a little bit, finding out that it uses rgb. give them a hint about using spaces
      .and('have.css', 'color', 'rgb(153, 153, 153)' )
  });

  it(`has the title of 'top heroes'`, () => {
    cy.visitAndSeed();
    cy.get('h3').contains('Top Heroes');
  })
  
  it(`has the title of 'Hero Search'`, () => {
    cy.visitAndSeed();
    cy.get('h4').contains('Hero Search');
  })

  it(`has a dashboard & heroes view link`, () => {
    cy.visitAndSeed();
    cy.get('nav a').first().as('dashboardlink')
    cy.get('nav a').last().as('heroeslink')

    // method 1
    cy.get('nav a').first().contains('Dashboard').parent()
      .get('a').last().contains('Heroes');

    // method 2
    cy.get('nav a').as('views');
    cy.get('@views').first().contains('Dashboard');
    cy.get('@views').last().contains('Heroes');

    // method 3
    cy.get('@dashboardlink').contains('Dashboard');
    cy.get('@heroeslink').contains('Heroes');

  })


  describe('heroes cards', () => {

    it(`has 4 heroes displaying`, () => {
      cy.visitAndSeed();
      cy.get('app-dashboard a').should('have.length', 4);
    })

    // fails until bug in system is fixed
    it(`shows 1 card when there's just 1 hero`, () => {
      cy.visitAndSeed({ heroes: [{id: 1, name: 'Spiderpig'}] })
      // cy.visitAndSeed({path: 'dashboard', heroes: [{id: 1, name: 'Spiderpig'}]})
      cy.get('app-dashboard a').should('have.length', 1);

    })

    it(`has the module and hero classes`, () => {
      cy.visitAndSeed();
      cy.get('app-dashboard a div').should('have.class', 'module').and('have.class', 'hero')
    })

  });

  describe('search box', () => {
    it('displays matching results when text is input', () => {
      cy.visitAndSeed();
      cy.get('#search-box').type('Mr. Nice');
      cy.get('.search-result li').contains('Mr. Nice').click();
      cy.url().should('include', '/detail/11')
    })
  })

  describe('messages', () => {
    it('clears values when clear is clicked', () => {
      cy.visitAndSeed();
      cy.contains('clear').click();
      cy.get('app-messages div div').should('have.length', 0);
    })
  })

  // a test for when wait is implemented
  // it(`finds the right hero`, () => {
  //   cy.visit('dashboard');
  //   cy.get('input').type('bo')
  //   cy.get('ul li').should('have.length', 1);
  // })

  // test solution
  // it(`finds the right hero`, () => {
  //   cy.intercept('/api/heroes').as('heroes')
  //   cy.visit('dashboard');
  //   cy.get('div.module'); // TRY THIS FIRST. CLUNKY SOLUTION.
  //   cy.wait('@heroes')
  //   cy.wait('@heroes')
  //   cy.get('input').type('bo')
  //   cy.get('ul li').should('have.length', 1);
  // })





});
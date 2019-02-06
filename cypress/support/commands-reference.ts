Cypress.Commands.add("seedAndVisit", 
    (
      {
        path = "/?tags=", 
        recentArticles = "fixture:all-articles",
        tags = 'fixture:tags',
        searchArticles = 'fixture:article1',
        currentIdentity = {}
      } = {}
    ) => {
  
  cy.server();

  cy.route({
    method: 'GET',
    url: '/api/articles/recent',
    response: recentArticles
  })
  cy.route({
    method: 'GET',
    url: '/api/currentIdentity',
    response: currentIdentity
  })
  cy.route({
    method: 'GET',
    url: '/api/auth/type',
    response: {"local":false}
  })
  cy.route({
    method: 'GET',
    url: '/api/tags',
    response: tags
  })
  cy.route({
    method: 'POST',
    url: '/api/articles/search',
    response: searchArticles
  })
  cy.visit(path);

})
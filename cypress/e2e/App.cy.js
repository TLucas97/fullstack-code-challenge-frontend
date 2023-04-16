Cypress.config('baseUrl', 'http://localhost:5173')
Cypress.config('viewportWidth', 1920)
Cypress.config('viewportHeight', 1080)

describe('App', () => {
  it('should render', () => {
    cy.visit('/')
    cy.get('[data-testid="main-app"]').should('exist')
  })
})

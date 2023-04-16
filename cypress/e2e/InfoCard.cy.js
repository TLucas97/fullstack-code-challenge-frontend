Cypress.config('baseUrl', 'http://localhost:5173')
Cypress.config('viewportWidth', 1920)
Cypress.config('viewportHeight', 1080)

describe('InfoCard', () => {
  it('should be able to search for user then refresh to initial state', () => {
    cy.visit('/')
    cy.get('[data-testid="search-input-user"]').should('exist').type('tlucas97')
    cy.wait(2000)
    cy.get('[data-testid="base-button-filter"]')
      .should('exist')
      .should('have.text', 'Filter')
      .click()
    cy.wait(2000)
    cy.get('[data-testid="refresh-btn"]').should('exist').click()
    cy.wait(2000)
    cy.contains('tlucas97').should('not.exist')
  })
})

describe('InfoCard', () => {
  it('should be able to scroll back to top when clicking the arrow up button', () => {
    cy.visit('/')
    cy.get('[data-testid="go-back-btn"]')
      .should('exist')
      .should('have.class', 'opacity-30')
    cy.get('[data-testid="user-list-box"]').scrollTo('bottom', {
      duration: 2000,
    })
    cy.get('[data-testid="go-back-btn"]')
      .should('exist')
      .should('not.have.class', 'opacity-30')
      .click()
  })
})

describe('InfoCard', () => {
  it('should render more characters when reaching the bottom of the box', () => {
    cy.visit('/')
    cy.get('[data-testid="user-card-wrapper"]').should('exist').should('have.length', 30)
    cy.get('[data-testid="user-list-box"]').scrollTo('bottom', {
      duration: 2000,
    })
    cy.get('[data-testid="user-card-wrapper"]').should('have.length', 60)
  })
})

describe('InfoCard', () => {
  it('should refresh data to default when clicking refresh button', () => {
    cy.visit('/')
    cy.get('[data-testid="user-card-wrapper"]').should('exist').should('have.length', 30)
    cy.get('[data-testid="user-list-box"]').scrollTo('bottom', {
      duration: 2000,
    })
    cy.wait(2000)
    cy.get('[data-testid="user-card-wrapper"]').should('have.length', 60)
    cy.get('[data-testid="refresh-btn"]').should('exist').click()
    cy.wait(2000)
    cy.get('[data-testid="user-card-wrapper"]').should('exist').should('have.length', 30)
  })
})

describe('InfoCard', () => {
  it('should be able to click on a user card and see the user details then go back to users list', () => {
    cy.visit('/')
    cy.get('[data-testid="close-btn"]')
      .should('exist')
      .should('have.class', 'opacity-30')
    cy.get('[data-testid="user-card-wrapper"]')
      .should('have.length', 30)
      .first()
      .click()
    cy.get('[data-testid="user-details-wrapper"]').should('not.exist')
    cy.get('[data-testid="refresh-btn"]')
      .should('exist')
      .should('have.class', 'opacity-30')
    cy.get('[data-testid="go-back-btn"]')
      .should('exist')
      .should('have.class', 'opacity-30')
    cy.wait(2000)
    cy.get('[data-testid="profile-card-wrapper"]')
      .should('exist')
      .contains('Followers')
    cy.get('[data-testid="profile-card-wrapper"]').contains('Following')
    cy.get('[data-testid="profile-card-wrapper"]').contains('Repos')
    cy.get('[data-testid="base-button-profile"]').should('exist').should('have.class', 'bg-white')
    cy.get('[data-testid="base-button-repos"]').should('exist').should('not.have.class', 'bg-white').click()
    cy.wait(2000)
    cy.get('[data-testid="base-button-profile"]').should('exist').should('not.have.class', 'bg-white')
    cy.get('[data-testid="base-button-repos"]').should('exist').should('have.class', 'bg-white')
    cy.get('[data-testid="repos-card-wrapper"]').contains('SSH URL')
    cy.get('[data-testid="repos-card-wrapper"]').contains('GIT URL')
    cy.get('[data-testid="repos-card-wrapper"]').contains('Details')
    cy.get('[data-testid="base-button-profile"]').should('exist').click()
    cy.get('[data-testid="base-button-repos"]').should('exist').should('not.have.class', 'bg-white')
    cy.get('[data-testid="base-button-profile"]').should('exist').should('have.class', 'bg-white')
    cy.get('[data-testid="close-btn"]')
      .should('exist')
      .should('not.have.class', 'opacity-30')
      .click()
    cy.get('[data-testid="user-card-wrapper"]')
      .should('exist')
      .should('have.length', 30)
  })
})

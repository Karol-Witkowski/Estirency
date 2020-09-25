describe('Links test', () => {
  // Work only in chrome - Electron will throw an error due to GitHub policy issues
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that link in about navigate to GitHub', () => {
    cy.contains('about')
      .click();
    cy.get('#about')
      .find('a')
      .click();
    cy.get('#sub-frame-error-details')
      .contains('github.com');
  });

  it('Check if API logo navigate to API provider homepage', () => {
    cy.get('a[href="https://exchangeratesapi.io/"]').should('have.attr', 'target', '_blank');
  });
});
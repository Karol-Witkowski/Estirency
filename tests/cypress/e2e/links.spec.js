describe('Links test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that link in about navigate to GitHub', () => {
    cy.contains('about')
      .click();
    cy.get('.about')
      .find('a')
      .click();
    cy.location()
      .its('href')
      .should('include', 'github.com/Karol-Witkowski');
  });

  it('Check if API logo navigate to API provider homepage', () => {
    cy.get('a[href="https://exchangeratesapi.io/"]').should('have.attr', 'target', '_blank');
  });
});

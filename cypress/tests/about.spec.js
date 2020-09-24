// Work only in chrome - Electron will throw an error due to GitHub policy issues

describe('About test', () => {
  it('Link navigate to GitHub profile', () => {
    cy.visit('/');
    cy.contains('about')
      .click();
    cy.get('#about')
      .find('a')
      .click();
    cy.get('#sub-frame-error-details')
      .contains('github.com');
  });
});

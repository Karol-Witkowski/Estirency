describe('Navigation test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that navigation to the base and about page work', () => {
    cy.contains('about')
      .click();
    cy.url()
      .should('contain', 'about');
    cy.contains('home')
      .click();
    cy.url()
      .should('contain', 'home');
  });

  it('Check if logo navigate to homepage', () => {
    cy.contains('about')
      .click();
    cy.url()
      .should('contain', 'about');
    cy.contains('esti')
      .click();
    cy.url()
      .should('contain', 'home');
  });
});

describe('Navigation test', () => {
  it('Check that navigation to the base and about page work as expected', () => {
    cy.visit('/');
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
    cy.visit('/');
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

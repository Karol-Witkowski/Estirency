describe('Navigation test', () => {
  it('Navigates to the / route', () => {
    cy.visit('/');
  });

  it('Navigates to the / route to about route and back', () => {
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
});

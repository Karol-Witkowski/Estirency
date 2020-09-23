describe('The application loads', () => {
  it('navigates to the / route', () => {
    cy.visit('/');
  });

  it('has the basic Todo list container', () => {
    cy.visit('/');
    cy.get('input').should('exist');
  });
});

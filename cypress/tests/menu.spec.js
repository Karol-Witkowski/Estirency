describe('Menu test', () => {
  it('Check that the initial amount of currency is displayed in the description', () => {
    cy.visit('/');
    cy.get('.rate')
      .find('span')
      .contains('100');
  });

  it('Check that the typed amount of currency is displayed in the description and restrictions works', () => {
    cy.visit('/');
    cy.get('.amountInput')
      .type('a200.123');
    cy.get('.rate')
      .find('span')
      .contains('200.12');
  });
});

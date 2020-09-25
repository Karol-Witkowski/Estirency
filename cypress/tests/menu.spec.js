describe('Menu test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that the typed amount of currency is displayed in the description and restrictions works', () => {
    cy.get('.rate')
      .find('span')
      .contains('100');
    cy.get('.amountInput')
      .type('a200.123');
    cy.get('.rate')
      .find('span')
      .contains('200.12');
  });

  it('Check that the selected currencies are displayed in the description', () => {
    cy.get('.rate')
      .find('div')
      .contains('100');
    // here ended
  });
});

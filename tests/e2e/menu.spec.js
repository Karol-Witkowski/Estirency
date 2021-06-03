describe('Menu test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that the typed amount of currency is displayed in the description panel and restrictions works', () => {
    cy.get('[data-cy=rate]')
      .find('span')
      .contains('100');
    cy.get('.amountInput')
      .type('a252..123');
    cy.get('[data-cy=rate]')
      .find('span')
      .contains('252.12');
  });

  it('Check that the selected currencies are displayed in the description and chart panels', () => {
    cy.get('section>span')
      .eq(1)
      .contains('zł (Polish zloty)');
    cy.get('section>span')
      .eq(3)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('input')
      .eq(0)
      .type('croatian')
      .click();
    cy.get('section')
      .contains('Croatian kuna')
      .click();
    cy.get('input')
      .eq(1)
      .type('british')
      .click();
    cy.get('section')
      .contains('British pound')
      .click({ force: true });
    cy.get('section>span')
      .eq(1)
      .contains('kn (Croatian kuna)');
    cy.get('section>span')
      .eq(3)
      .contains('£ (British pound)');
    cy.get('h3')
      .eq(2)
      .contains('HRK/GBP');
  });

  it('Check that the typed currencies are displayed in the description and chart panels', () => {
    cy.get('section>span')
      .eq(1)
      .contains('zł (Polish zloty)');
    cy.get('section>span')
      .eq(3)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('input')
      .eq(0)
      .click()
      .type('croatian{enter}');
    cy.get('input')
      .eq(1)
      .click()
      .type('british{enter}');
    cy.get('section>span')
      .eq(1)
      .contains('kn (Croatian kuna)');
    cy.get('section>span')
      .eq(3)
      .contains('£ (British pound)');
    cy.get('h3')
      .eq(2)
      .contains('HRK/GBP');
  });

  it('Check swapping currencies', () => {
    cy.get('section>span')
      .eq(1)
      .contains('zł (Polish zloty)');
    cy.get('section>span')
      .eq(3)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('[data-cy=swapIcon]')
      .click();
    cy.get('section>span')
      .eq(1)
      .contains('€ (European Euro)');
    cy.get('section>span')
      .eq(3)
      .contains('zł (Polish zloty)');
    cy.get('h3')
      .eq(2)
      .contains('EUR/PLN');
  });
});
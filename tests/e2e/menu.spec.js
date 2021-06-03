describe('Menu test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Prevent entering letters', () => {
    cy.get('[data-cy=rate]')
      .find('span')
      .contains('100');
    cy.get('input[name=amount]')
      .type('a252..123');
    cy.get('[data-cy=rate]')
      .get('span[name=baseAmount]')
      .contains('252.12');
  });

  it('Display selected currencies in the description and chart panels', () => {
    cy.get('span[name=base]')
      .contains('zł (Polish zloty)');
    cy.get('span[name=target]')
      .contains('€ (European Euro)');
    cy.get('h3[name=currencyHeader]')
      .contains('PLN/EUR');
    cy.get('input[name=baseCurrency]')
      .type('croatian')
      .click();
    cy.get('section')
      .contains('Croatian kuna')
      .click();
    cy.get('input[name=targetCurrency]')
      .type('british')
      .click();
    cy.get('section')
      .contains('British pound')
      .click();
    cy.get('span[name=base]')
      .contains('kn (Croatian kuna)');
    cy.get('span[name=target]')
      .contains('£ (British pound)');
    cy.get('h3[name=currencyHeader]')
      .contains('HRK/GBP');
  });

  it('Display typed currencies in the description and chart panels', () => {
    cy.get('span[name=base]')
      .contains('zł (Polish zloty)');
    cy.get('span[name=target]')
      .contains('€ (European Euro)');
    cy.get('h3[name=currencyHeader]')
      .contains('PLN/EUR');
    cy.get('input[name=baseCurrency]')
      .click()
      .type('croatian{enter}');
    cy.get('input[name=targetCurrency]')
      .click()
      .type('british{enter}');
    cy.get('span[name=base]')
      .contains('kn (Croatian kuna)');
    cy.get('span[name=target]')
      .contains('£ (British pound)');
    cy.get('h3[name=currencyHeader]')
      .contains('HRK/GBP');
  });

  it('Swap currencies', () => {
    cy.get('span[name=base]')
      .contains('zł (Polish zloty)');
    cy.get('span[name=target')
      .contains('€ (European Euro)');
    cy.get('h3[name=currencyHeader]')
      .contains('PLN/EUR');
    cy.get('[data-cy=swapIcon]')
      .click();
    cy.get('span[name=base]')
      .contains('€ (European Euro)');
    cy.get('span[name=target]')
      .contains('zł (Polish zloty)');
    cy.get('h3[name=currencyHeader]')
      .contains('EUR/PLN');
  });
});

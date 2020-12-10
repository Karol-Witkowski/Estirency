describe('Menu test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that the typed amount of currency is displayed in the description panel and restrictions works', () => {
    cy.get('.rate')
      .find('span')
      .contains('100');
    cy.get('.amountInput')
      .type('a252..123');
    cy.get('.rate')
      .find('span')
      .contains('252.12');
  });

  it('Check that the selected currencies are displayed in the description and chart panels', () => {
    cy.get('div>span')
      .eq(5)
      .contains('zł (Polish zloty)');
    cy.get('div>span')
      .eq(7)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('input')
      .eq(0)
      .click();
    cy.get('.select')
      .contains('Croatian kuna')
      .click();
    cy.get('input')
      .eq(1)
      .click();
    cy.get('.select')
      .contains('British pound')
      .click({ force: true });
    cy.get('div>span')
      .eq(5)
      .contains('kn (Croatian kuna)');
    cy.get('div>span')
      .eq(7)
      .contains('£ (British pound)');
    cy.get('h3')
      .eq(2)
      .contains('HRK/GBP');
  });

  it('Check that the typed currencies are displayed in the description and chart panels', () => {
    cy.get('div>span')
      .eq(5)
      .contains('zł (Polish zloty)');
    cy.get('div>span')
      .eq(7)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('input')
      .eq(0)
      .click()
      .type('croatian {enter}');
    cy.get('input')
      .eq(1)
      .click()
      .type('british {enter}');
    cy.get('div>span')
      .eq(5)
      .contains('kn (Croatian kuna)');
    cy.get('div>span')
      .eq(7)
      .contains('£ (British pound)');
    cy.get('h3')
      .eq(2)
      .contains('HRK/GBP');
  });

  it('Check swapping currencies', () => {
    cy.get('div>span')
      .eq(5)
      .contains('zł (Polish zloty)');
    cy.get('div>span')
      .eq(7)
      .contains('€ (European Euro)');
    cy.get('h3')
      .eq(2)
      .contains('PLN/EUR');
    cy.get('.select')
      .find('img')
      .click();
    cy.get('div>span')
      .eq(5)
      .contains('€ (European Euro)');
    cy.get('div>span')
      .eq(7)
      .contains('zł (Polish zloty)');
    cy.get('h3')
      .eq(2)
      .contains('EUR/PLN');
  });
});

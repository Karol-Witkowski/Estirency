describe('Menu test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check that the typed amount of currency is displayed in the description panel and restrictions works', () => {
    cy.get('.rate')
      .find('span')
      .contains('100');
    cy.get('.amountInput')
      .type('a200.123');
    cy.get('.rate')
      .find('span')
      .contains('200.12');
  });

  it('Check that the selected currencies are displayed in the description panel', () => {
    cy.get('div>span').eq(7)
      .contains('PLN (Polish zloty)');
    cy.get('div>span').eq(9)
      .contains('EUR (European Euro)');
    cy.get('div>input')
      .eq(0)
      .click();
    cy.get('.select')
      .contains('Croatian kuna')
      .click();
    cy.get('div>input')
      .eq(1)
      .click();
    cy.get('.select')
      .contains('British pound')
      .click();
    cy.get('div>span').eq(7)
      .contains('HRK (Croatian kuna)');
    cy.get('div>span').eq(9)
      .contains('GBP (British pound)');
  });

  it('Check that the typed currencies are displayed in the description panel', () => {
    cy.get('div>span').eq(7)
      .contains('PLN (Polish zloty)');
    cy.get('div>span').eq(9)
      .contains('EUR (European Euro)');
    cy.get('div>input')
      .eq(0)
      .click()
      .type('croatian {enter}');
    cy.get('div>input')
      .eq(1)
      .click()
      .type('british {enter}');
    cy.get('div>span').eq(7)
      .contains('HRK (Croatian kuna)');
    cy.get('div>span').eq(9)
      .contains('GBP (British pound)');
  });

  it('Check swapping currencies ', () => {
    cy.get('div>span').eq(7)
      .contains('PLN (Polish zloty)');
    cy.get('div>span').eq(9)
      .contains('EUR (European Euro)');
    cy.get('.select')
      .find('img')
      .click();
    cy.get('div>span').eq(7)
      .contains('EUR (European Euro)');
    cy.get('div>span').eq(9)
      .contains('PLN (Polish zloty)');
  });
});

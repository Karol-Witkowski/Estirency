import { shallowMount } from '@vue/test-utils';
import Rate from '@/components/rate/Rate.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  response: {
    data: {
      rates: {
        EUR: '2',
        PLN: '4',
      },
    },
  },
  get: jest.fn(() => Promise.resolve({ data: this.response })),
}));

describe('SelectMenu.vue test', () => {
  const currencies = [
    { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
    { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
  ];

  const wrapper = shallowMount(Rate, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
          amountValue: 2,
        },
        mutations: {
          setBaseCurrency(state, base) {
            state.baseCurrency = base;
          },
          setTargetCurrency(state, wanted) {
            state.targetCurrency = wanted;
          },
          setAmountValue(state, amount) {
            state.amountValue = amount;
          },
        },
      },
    },
  });

  it('Check axios call', async () => {
    expect(axios.get).toBeCalledWith('https://api.exchangeratesapi.io/latest?base=PLN');
    expect(wrapper.vm.setRate).toEqual(2);
  });
  // NEXT TEST SETRATE expect(wrapper.vm.setRate).toEqual(2);
});

import { mount } from '@vue/test-utils';
import Rate from '@/components/rate/Rate.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ EUR: 2 })),
}));

describe('SelectMenu.vue test', () => {
  const currencies = [
    { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
    { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
  ];

  const wrapper = mount(Rate, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
          amountValue: 100,
          loaded: false,
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

  it('Calls axios.get', async () => {
    expect(wrapper.vm.getRates).toEqual({ EUR: [2] });
    expect(wrapper.vm.rate).toEqual([2]);
    expect(axios.get).toBeCalledWith('https://api.exchangeratesapi.io/latest?base=EUR');
  });
});

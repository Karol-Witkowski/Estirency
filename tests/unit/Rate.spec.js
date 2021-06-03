import { shallowMount } from '@vue/test-utils';
import Rate from '@/components/Rate.vue';
import axios from 'axios';

let wrapper;
const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      rates: {
        EUR: 2.1234,
        PLN: 4.1234,
      },
    },
  })),
}));

beforeEach(() => {
  wrapper = shallowMount(Rate, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
          amountValue: 2,
        },
      },
    },
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Rate.vue test', () => {
  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Store data', () => {
    expect(wrapper.find('span[name=baseAmount]').text()).toMatch('2');
    expect(wrapper.find('span[name=base]').text()).toMatch('zł (Polish zloty)');
    expect(wrapper.find('span[name=target]').text()).toMatch('€ (European Euro)');
  });

  it('Get data on mount', () => {
    expect(axios.get).toHaveBeenCalled();
  });
});

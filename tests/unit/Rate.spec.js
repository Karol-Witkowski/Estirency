import { shallowMount } from '@vue/test-utils';
import Rate from '@/components/Rate.vue';
import axios from 'axios';

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

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('Rate.vue test', () => {
  const wrapper = shallowMount(Rate, {
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

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check mocked store', async () => {
    expect(wrapper.findAll('span').at(1).text()).toMatch('2');
    expect(wrapper.findAll('span').at(2).text()).toContain('zł (Polish zloty)');
    expect(wrapper.findAll('span').at(4).text()).toContain('€ (European Euro)');
  });

  it('Check axios call', async () => {
    expect(axios.get).toHaveBeenCalled();
  });

  it('Check setRate computed', async () => {
    expect(wrapper.vm.setRate).toEqual(2.123);
  });

  it('Check setAmount computed', async () => {
    expect(wrapper.vm.setAmount).toEqual(4.25);
  });
});

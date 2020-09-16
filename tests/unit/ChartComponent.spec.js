import { mount } from '@vue/test-utils';
import ChartComponent from '@/components/chartComponent/ChartComponent.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      response: {
      },
    },
  })),
}));

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('ChartComponent.vue test', () => {
  const wrapper = mount(ChartComponent, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
          loaded: true,
        },
        mutations: {
          setBaseCurrency(state, base) {
            state.baseCurrency = base;
          },
          setTargetCurrency(state, wanted) {
            state.targetCurrency = wanted;
          },
        },
      },
    },
  });

  it('Check mocked store', async () => {
    expect(wrapper.findAll('p').at(0).text()).toContain('PLN');
    expect(wrapper.findAll('p').at(0).text()).toContain('EUR');
  });

  it('Check axios call', async () => {
    expect(axios.get).toBeCalledWith('https://fcsapi.com/api-v2/forex/history?symbol=PLN/EUR&period=1d&from=2019-09-15T12:00&to=2020-09-15T12:00&access_key=WOR4I12d7qPWzV0A3yw1KRHeApKaB8ZjCtpsy9ZTzCnOeNUu9k<DELETETHIS>');
  });

  it('Check that datachart exists when state.loaded = true', async () => {
    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  it('Check that datachart not exist when state.loaded = false', async () => {
    const chart = mount(ChartComponent, {
      mocks: {
        $store: {
          state: {
            currency: currencies,
            baseCurrency: currencies[0],
            targetCurrency: currencies[1],
            loaded: false,
          },
        },
      },
    });
    expect(chart.find('span').exists()).toBeFalsy();
  });
});

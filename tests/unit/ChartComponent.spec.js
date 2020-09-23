import { shallowMount } from '@vue/test-utils';
import ChartComponent from '@/components/chartComponent/ChartComponent.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      response: [
        { c: '0.2307', tm: '2019-09-15 00:00:00' },
        { c: '0.2432', tm: '2019-09-17 00:00:00' },
      ],
    },
  })),
}));

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('ChartComponent.vue test', () => {
  const wrapper = shallowMount(ChartComponent, {
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
    expect(axios.get).toBeCalledWith('https://fcsapi.com/api-v2/forex/history?symbol=PLN/EUR&period=1d&from=2019-09-22T12:00&to=2020-09-22T12:00&access_key=WOR4I12d7qPWzV0A3yw1KRHeApKaB8ZjCtpsy9ZTzCnOeNUu9k<DELETETHIS>');
    expect(wrapper.vm.history).toEqual([{ c: '0.2307', tm: '2019-09-15 00:00:00' }, { c: '0.2432', tm: '2019-09-17 00:00:00' }]);
  });

  it('Check that datachart exists when state.loaded = true', async () => {
    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  it('Check dataLoop method - loop, slice and push received data to chart component', () => {
    expect(wrapper.vm.chartData.labels).toEqual(['2019-09-15']);
    expect(wrapper.vm.chartData.datasets[0].data).toEqual(['0.2307']);
  });

  it('Check that datachart not exist when state.loaded = false', async () => {
    const chart = shallowMount(ChartComponent, {
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

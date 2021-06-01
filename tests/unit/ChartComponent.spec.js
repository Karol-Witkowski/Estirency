import { shallowMount } from '@vue/test-utils';
import ChartComponent from '@/components/ChartComponent.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      response: {
        '2019-09-15': { cc: '0.2307' },
        '2019-09-17': { cc: '0.2432' },
      },
    },
  })),
}));

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('ChartComponent.vue test', () => {
  let wrapper = shallowMount(ChartComponent, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
        },
      },
    },
  });

  it('Check mocked store', async () => {
    expect(wrapper.findAll('h3').at(0).text()).toContain('PLN');
    expect(wrapper.findAll('h3').at(0).text()).toContain('EUR');
  });

  it('Check axios call', async () => {
    expect(wrapper.vm.historyData).toEqual({ '2019-09-15': '0.2307' }, { '2019-09-17': '0.2432' });
    expect(axios.get).toHaveBeenCalled();
  });

  it('Check that datachart exists when state.loaded = true', async () => {
    wrapper = shallowMount(ChartComponent, {
      mocks: {
        $store: {
          state: {
            currency: currencies,
            baseCurrency: currencies[0],
            targetCurrency: currencies[1],
            loaded: true,
          },
        },
      },
    });
    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  it('Check setData method - map and set history data', () => {
    expect(wrapper.vm.chartData.labels).toEqual(['15.09.2019']);
    expect(wrapper.vm.chartData.datasets[0].data).toEqual([0.2307]);
  });

  it('Check that datachart not exist when state.loaded = false', async () => {
    expect(wrapper.find('span:nth-of-type(3)').exists()).toBeFalsy();
  });
});

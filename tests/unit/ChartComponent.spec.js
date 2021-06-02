import { shallowMount } from '@vue/test-utils';
import ChartComponent from '@/components/ChartComponent.vue';
import axios from 'axios';

let wrapper;

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
  wrapper = shallowMount(ChartComponent, {
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

  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check chart header', () => {
    expect(wrapper.find('h3[name=currencyHeader]').text()).toMatch('PLN/EUR');
  });

  it('Check that chart is not rendered', () => {
    expect(wrapper.find('[name=chart]').exists()).toBeFalsy();
  });

  it('Check axios call', () => {
    expect(wrapper.vm.historyData).toEqual({ '2019-09-15': '0.2307' }, { '2019-09-17': '0.2432' });
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveReturnedTimes(1);
  });

  it('Check that datachart exists when state.loaded = true', () => {
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

    expect(wrapper.find('[name=chart]').exists()).toBeTruthy();
  });

  it('Check setData method - map and set history data', () => {
    expect(wrapper.vm.chartData.labels).toEqual(['15.09.2019']);
    expect(wrapper.vm.chartData.datasets[0].data).toEqual([0.2307]);
  });
});

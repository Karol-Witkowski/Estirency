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
  let wrapper = shallowMount(ChartComponent, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0],
          targetCurrency: currencies[1],
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
    expect(wrapper.findAll('h3').at(0).text()).toContain('PLN');
    expect(wrapper.findAll('h3').at(0).text()).toContain('EUR');
  });

  it('Check axios call', async () => {
    expect(axios.get).toBeCalledWith('https://fcsapi.com/api-v2/forex/history?symbol=PLN/EUR&period=1d&from=2019-10-26T12:00&to=2020-10-26T12:00&access_key=6SEwraW2s3dD6zluAtbqAKr2KoQmJBaUNsosz1D4IlkX3<DELETETHIS>');
    expect(wrapper.vm.history).toEqual([{ c: '0.2307', tm: '2019-09-15 00:00:00' }, { c: '0.2432', tm: '2019-09-17 00:00:00' }]);
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

  it('Check dataPush method - loop, slice and push received data to chart component', () => {
    expect(wrapper.vm.chartData.labels).toEqual(['2019-09-15']);
    expect(wrapper.vm.chartData.datasets[0].data).toEqual(['0.2307']);
  });

  it('Check that datachart not exist when state.loaded = false', async () => {
    expect(wrapper.find('span:nth-of-type(3)').exists()).toBeFalsy();
  });
});

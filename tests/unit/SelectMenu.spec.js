import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import SelectMenu from '@/components/SelectMenu.vue';

let wrapper;
const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

beforeEach(() => {
  wrapper = mount(SelectMenu, {
    mocks: {
      $store: {
        state: {
          currency: currencies,
          baseCurrency: currencies[0].name,
          targetCurrency: currencies[1].name,
          amountValue: '',
        },
      },
    },
  });
});

afterEach(() => {
  jest.resetAllMocks();
  wrapper.destroy();
});

describe('SelectMenu.vue test', () => {
  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Show v-select component', () => {
    expect(wrapper.findComponent({ name: 'v-select' }).exists()).toBeTruthy();
  });

  it('Renders currency values', () => {
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toContain('Polish zloty');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toContain('European Euro');
    expect(wrapper.find('input[name=amount]').text()).toMatch('');
  });

  it('Swap currencies', () => {
    wrapper.find('img').trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toContain('European Euro');
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toContain('Polish zloty');
    });
  });

  it('Prevent entering letters', () => {
    wrapper = shallowMount(SelectMenu, {
      mocks: {
        $store: {
          state: {
            currency: currencies,
            baseCurrency: 1,
            targetCurrency: 2,
            amountValue: 'should not display',
          },
        },
      },
    });
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('');
    expect(wrapper.find('input[name=amount]').text()).toMatch('');
  });
});

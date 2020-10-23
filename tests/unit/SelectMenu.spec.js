import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('SelectMenu.vue test', () => {
  const wrapper = mount(SelectMenu, {
    mocks: {
      $store: {
        state: {
          baseCurrency: currencies[0].cc,
          targetCurrency: currencies[1].name,
          amountValue: '',
        },
      },
    },
  });

  it('Check that 1 of the 2 child components are rendered', () => {
    expect(wrapper.findComponent({ name: 'v-select' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Home' }).exists()).toBe(false);
  });

  it('Renders values using a mock getter', () => {
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('PLN');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('European Euro');
    expect(wrapper.findAll('input').at(2).text()).toMatch('');
  });

  it('Check if swapValues function swap stored values', () => {
    wrapper.find('img').trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('European Euro');
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('PLN');
    });
  });

  it('Check if currencyRestrictions allows only letters', () => {
    const wrapper2 = mount(SelectMenu, {
      mocks: {
        $store: {
          state: {
            baseCurrency: 1,
            targetCurrency: 2,
          },
        },
      },
    });
    expect(wrapper2.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('');
    expect(wrapper2.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('');
  });

  it('Check if amountRestrictions allows only numbers', () => {
    const wrapper3 = shallowMount(SelectMenu, {
      mocks: {
        $store: {
          state: {
            amountValue: 'should not display',
          },
        },
      },
    });
    expect(wrapper3.findAll('input').at(0).text()).toMatch('');
  });
});

import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';

const currencies = [
  { cc: 'PLN', symbol: 'z\u0142', name: 'Polish zloty' },
  { cc: 'EUR', symbol: '\u20ac', name: 'European Euro' },
];

describe('SelectMenu.vue test', () => {
  let wrapper = mount(SelectMenu, {
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

  it('Should show <v-select /> component', () => {
    expect(wrapper.findComponent({ name: 'v-select' }).exists()).toBe(true);
  });

  it('Renders values using a mock getter', () => {
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toContain('Polish zloty');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toContain('European Euro');
    expect(wrapper.findAll('input').at(2).text()).toMatch('');
  });

  it('Check if swapValues function swap stored values', () => {
    wrapper.find('img').trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toContain('European Euro');
      expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toContain('Polish zloty');
    });
  });

  it('Check if currencyRestrictions allows only letters and ashallowMountRestions allows only numbers', () => {
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
    expect(wrapper.findAll('input').at(0).text()).toMatch('');
  });
});

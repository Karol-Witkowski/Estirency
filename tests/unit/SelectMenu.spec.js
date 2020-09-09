/* eslint-disable no-shadow */
import { mount } from '@vue/test-utils';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';

describe('SelectMenu.vue test', () => {
  const wrapper = mount(SelectMenu, {
    mocks: {
      $store: {
        state: {
          baseCurrency: 'POLISH ZLOTY',
          targetCurrency: 'EUROPEAN EURO',
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
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('POLISH ZLOTY');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('EUROPEAN EURO');
    expect(wrapper.findAll('input').at(2).text()).toMatch('');
  });

  it('Check if swapValues function swap stored values', () => {
    wrapper.vm.$emit('swapValues');

    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('EUROPEAN EURO');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('POLISH ZLOTY');
  });

  it('Check if currencyRestrictions allows only letters', () => {
    const wrapper = mount(SelectMenu, {
      mocks: {
        $store: {
          state: {
            baseCurrency: 1,
            targetCurrency: 2,
          },
        },
      },
    });
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(0).text()).toMatch('');
    expect(wrapper.findAllComponents({ name: 'v-select' }).at(1).text()).toMatch('');
  });

  it('Check if amountRestrictions allows only numbers', () => {
    const wrapper = mount(SelectMenu, {
      mocks: {
        $store: {
          state: {
            amountValue: 'should not display',
          },
        },
      },
    });
    expect(wrapper.findAll('input').at(2).text()).toMatch('');
  });
});

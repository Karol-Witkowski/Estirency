import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';

describe('Home.vue test', () => {
  const wrapper = shallowMount(SelectMenu);

  it('Check the name of home view and that 3 child components are rendered', () => {
    expect(wrapper.name()).to.match(/Home/);
    expect(wrapper.findAll('.v-select').exists());
  });
});

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home/Home.vue';

describe('home.vue test', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Home);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Check the name of home view and that 3 child components are rendered', () => {
    expect(wrapper.name()).to.match(/Home/);
    expect(wrapper.findAll('.Selectmenu').exists());
    expect(wrapper.findAll('.Rate').exists());
    // expect(wrapper.findAll('.Chart').exists());
  });
});

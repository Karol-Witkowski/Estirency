import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Navbar from '@/components/navbar/Navbar.vue';

const RouterLink = {
  name: 'router-link',
  render(h) {
    return h('div', this.$slots.default);
  },
  props: ['to'],
};

const wrapper = shallowMount(Navbar, {
  stubs: {
    RouterLink,
  },
});

describe('Navbar.vue test', () => {
  it('Check the name of the component', () => {
    expect(wrapper.name()).to.match(/Navbar/);
  });

  it('Navigation should render correctly', () => {
    Vue.use(VueRouter);

    expect(wrapper.find(RouterLink).props().to).to.match(/home/);
    expect(wrapper.find(RouterLink).text()).to.match(/estirency/);
  });
});

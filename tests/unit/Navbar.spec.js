import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Navbar from '@/components/Navbar.vue';

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
  it('Navigation should render correctly', () => {
    Vue.use(VueRouter);

    expect(wrapper.findComponent(RouterLink).props().to).toMatch('home');
    expect(wrapper.findComponent(RouterLink).text()).toMatch('esti rency');
  });
});

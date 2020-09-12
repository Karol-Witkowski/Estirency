import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home/Home.vue';

describe('Home.vue test', () => {
  const wrapper = shallowMount(Home);

  it('Check that 3 of the 4 child components are rendered', () => {
    expect(wrapper.findComponent({ name: 'SelectMenu' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Rate' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ChartComponent' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(false);
  });
});

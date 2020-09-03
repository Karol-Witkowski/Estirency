import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home/Home.vue';

describe('Home.vue test', () => {
  const wrapper = shallowMount(Home);

  it('Check the name of home view and that 3 child components are rendered', () => {
    expect(wrapper.name()).to.match(/Home/);
    expect(wrapper.findAll('.SelectMenu').exists());
    expect(wrapper.findAll('.Rate').exists());
    expect(wrapper.findAll('.ChartComponent').exists());
  });
});

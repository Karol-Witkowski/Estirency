import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home/Home.vue';

describe('Home.vue test', () => {
  const wrapper = shallowMount(Home);

  it('Check that 3 child components are rendered', () => {
    expect(wrapper.findAll('.SelectMenu').exists());
    expect(wrapper.findAll('.Rate').exists());
    expect(wrapper.findAll('.ChartComponent').exists());
  });
});

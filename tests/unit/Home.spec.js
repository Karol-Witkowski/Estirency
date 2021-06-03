import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Home);
});

afterEach(() => {
  jest.resetAllMocks();
  wrapper.destroy();
});

describe('Home.vue test', () => {
  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Show SelectMenu component', () => {
    expect(wrapper.findComponent({ name: 'SelectMenu' }).exists()).toBeTruthy();
  });

  it('Show Rate component', () => {
    expect(wrapper.findComponent({ name: 'Rate' }).exists()).toBeTruthy();
  });

  it('Show ChartComponent component', () => {
    expect(wrapper.findComponent({ name: 'ChartComponent' }).exists()).toBeTruthy();
  });
});

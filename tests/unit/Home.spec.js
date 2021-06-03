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

  it('Render SelectMenu component', () => {
    expect(wrapper.findComponent({ name: 'SelectMenu' }).exists()).toBeTruthy();
  });

  it('Render Rate component', () => {
    expect(wrapper.findComponent({ name: 'Rate' }).exists()).toBeTruthy();
  });

  it('Render ChartComponent component', () => {
    expect(wrapper.findComponent({ name: 'ChartComponent' }).exists()).toBeTruthy();
  });
});

import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import store from '@/store';

let wrapper;
const router = new VueRouter({
  routes: [
    { path: '/home', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: { render: (h) => h } },
  ],
});

const localVue = createLocalVue();
localVue.use(VueRouter);

Vue.use(VueRouter);

beforeEach(() => {
  wrapper = mount(App, {
    localVue,
    router,
    store,
  });
});

afterEach(() => {
  jest.resetAllMocks();
  wrapper.destroy();
});

describe('App.vue test', () => {
  it('Render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should show Theme component', () => {
    expect(wrapper.findComponent({ name: 'Theme' }).exists()).toBe(true);
  });

  it('Should show Navbar component', () => {
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
  });

  it('Renders a child component via routing', async () => {
    await router.push('/home');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Home).exists()).toEqual(true);
  });
});

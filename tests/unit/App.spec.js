import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(VueRouter);

Vue.use(VueRouter);

describe('App', () => {
  let router = new VueRouter({
    routes: [
      { path: '/home', name: 'Home', component: Home },
      { path: '/about', name: 'About', component: { render: (h) => h } },
    ],
  });
  let wrapper = mount(App, {
    localVue,
    router,
    store,
  });

  it('Should show <Theme /> component', () => {
    expect(wrapper.findComponent({ name: 'Theme' }).exists()).toBe(true);
  });

  it('Should show <Navbar /> component', () => {
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
  });

  it('Renders a child component via routing', async () => {
    router.push('/home');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Home).exists()).toEqual(true);
  });

  it('Should have a different route than /home', async () => {
    router = new VueRouter({
      mode: 'abstract',
    });
    wrapper = mount(App, {
      localVue,
      router,
    });

    expect(wrapper.findComponent(Home).exists()).toEqual(false);
  });
});

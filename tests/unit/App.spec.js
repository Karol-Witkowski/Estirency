import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/home/Home.vue';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(VueRouter);

Vue.use(VueRouter);

describe('App', () => {
  it('check that 2 of the 3 child components are rendered', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.findComponent({ name: 'Theme' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Home' }).exists()).toBe(false);
  });

  it('Renders a child component via routing', async () => {
    const router = new VueRouter({
      routes: [
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: { render: (h) => h } },
      ],
    });
    const wrapper = mount(App, {
      localVue,
      router,
      store,
    });

    router.push('/home');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Home).exists()).toEqual(true);
  });

  it('Should have a different route than /home', async () => {
    const router = new VueRouter({
      routes: [
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: { render: (h) => h } },
      ],
      mode: 'abstract',
    });
    const wrapper = mount(App, {
      localVue,
      router,
    });

    expect(wrapper.findComponent(Home).exists()).toEqual(false);
  });
});

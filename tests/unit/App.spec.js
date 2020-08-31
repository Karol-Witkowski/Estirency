import { expect } from 'chai';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home/Home.vue';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(VueRouter);

Vue.use(VueRouter);

describe('App', () => {
  it('Check the app name and components existence', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.name()).to.match(/App/);
    expect(wrapper.findAll('.theme').exists());
    expect(wrapper.findAll('.navigation').exists());
    expect(wrapper.findAll('.router-view').exists());
  });

  it('renders a child component via routing', async () => {
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

    expect(wrapper.find(Home).exists()).to.equal(true);
  });

  it('should have a different route than /home', async () => {
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

    expect(wrapper.find(Home).exists()).to.equal(false);
  });
});

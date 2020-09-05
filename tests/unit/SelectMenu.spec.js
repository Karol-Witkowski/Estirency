import { shallowMount } from '@vue/test-utils';
import SelectMenu from '@/components/selectmenu/SelectMenu.vue';

describe('SelectMenu.vue test', () => {
  const wrapper = shallowMount(SelectMenu, {
    mocks: {
      $store: {
        state: {
        },
      },
    },
  });

  it('check that 1 of the 2 child components are rendered', () => {
    expect(wrapper.findComponent({ name: 'v-select' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Home' }).exists()).toBe(false);
  });
});

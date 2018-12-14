import { shallowMount } from '@vue/test-utils';
import SessionGroup from '../../../src/components/SessionsGroup.vue';
import { FullSessionGroup } from '../__testdata__/FullSessionGroup';

describe('SessionGroup.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(SessionGroup, {
      propsData: { group: FullSessionGroup },
    });
    expect(wrapper).toMatchSnapshot();
  });
});

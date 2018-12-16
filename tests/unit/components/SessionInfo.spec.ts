import { shallowMount } from '@vue/test-utils';
import SessionInfo from '../../../src/components/SessionInfo.vue';
import { FullSessionInfo } from '../__testdata__/SessionInfo';

describe('SessionInfo.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(SessionInfo, {
      propsData: { item: FullSessionInfo },
    });
    expect(wrapper).toMatchSnapshot();
  });
});

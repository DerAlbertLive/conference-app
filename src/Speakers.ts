import { IAppState, IDisplaySpeaker, IDisplaySpeakerGroup } from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISpeakersState {
  groups: IDisplaySpeakerGroup[];
}

const state: ISpeakersState = {
  groups: [],
};

function getGroups(speakers: IDisplaySpeaker[]): IDisplaySpeakerGroup[] {
  return [
    {
      title: 'Group VUEX',
      speakers: speakers,
    },
  ];
}

const actions: ActionTree<ISpeakersState, IAppState> = {
  loadGroups({ commit, state, rootState }) {
    if (state.groups && state.groups.length > 0) {
      return;
    }
    const groups = getGroups(rootState.data.speakers);
    commit('groupsLoaded', groups);
  },
};

const getters: GetterTree<ISpeakersState, IAppState> = {
  groups(state) {
    return state.groups;
  },
};
const mutations: MutationTree<ISpeakersState> = {
  groupsLoaded(state, groups: IDisplaySpeakerGroup[]) {
    state.groups = groups;
  },
};

const namespaced: boolean = true;

const speakers: Module<ISpeakersState, IAppState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default speakers;

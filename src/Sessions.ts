import { IAppState, IDisplaySession, IDisplaySessionGroup } from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISessionsState {
  groups: IDisplaySessionGroup[];
}

const state: ISessionsState = {
  groups: [],
};

function getGroups(sessions: IDisplaySession[]): IDisplaySessionGroup[] {
  return [
    {
      title: 'Eins',
      sessions: sessions,
    },
  ];
}
const actions: ActionTree<ISessionsState, IAppState> = {
  async loadGroups({ commit, state, rootState }) {
    var groups = getGroups(rootState.data.sessions);
    commit('groupsLoaded', groups);
  },
};

const getters: GetterTree<ISessionsState, IAppState> = {
  groups(state) {
    return state.groups;
  },
};

const mutations: MutationTree<ISessionsState> = {
  groupsLoaded(state, payLoad) {
    state.groups = payLoad;
  },
};

const module: Module<ISessionsState, IAppState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
export default module;

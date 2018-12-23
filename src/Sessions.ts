import { IAppState, IDisplaySession, IDisplaySessionGroup } from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISessionsState {
  groups: IDisplaySessionGroup[];
}

const sessionsState: ISessionsState = {
  groups: [],
};

function getGroups(sessions: IDisplaySession[]): IDisplaySessionGroup[] {
  return [
    {
      title: 'Eins',
      sessions,
    },
  ];
}
const actions: ActionTree<ISessionsState, IAppState> = {
  async loadGroups({ commit, rootState }) {
    const groups = getGroups(rootState.data.sessions);
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

const moduleSessions: Module<ISessionsState, IAppState> = {
  namespaced: true,
  state: sessionsState,
  actions,
  getters,
  mutations,
};
export default moduleSessions;

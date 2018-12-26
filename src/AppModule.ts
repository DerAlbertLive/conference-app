import { IAppState } from '@/types';
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex';
import { SessionService } from './services/SessionService';

export const AppState: IAppState = {
  data: {} as any,
};

let initializing = false;

const actions: ActionTree<IAppState, IAppState> = {
  async initializeApplication({ commit, rootState }) {
    console.log('initializeApplication')
    if (initializing) {
      return;
    }
    if (rootState.data.sessions && rootState.data.sessions.length > 0) {
      return;
    }
    initializing = true;
    const service = new SessionService();
    const data = await service.getConferenceData();

    commit('applicationInitialized', { data });
    initializing = false;
  },
};

const getters: GetterTree<IAppState, IAppState> = {
  conftitle(state) {
    return state.data.title;
  },
};

const mutations: MutationTree<IAppState> = {
  applicationInitialized(state: IAppState, { data }) {
    console.log('mutating data', data)
    state.data = data;
  },
};

export default {
  actions,
  getters,
  mutations,
  AppState,
};

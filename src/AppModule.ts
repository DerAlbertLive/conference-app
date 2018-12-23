import { IAppState } from '@/types';
import { ActionContext, ActionTree, MutationTree } from 'vuex';
import { SessionService } from './services/SessionService';

export const AppState: IAppState = {
  data: {} as any,
};

let initializing = false;

const actions: ActionTree<IAppState, IAppState> = {
  async initializeApplication({ commit, rootState }) {
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

const mutations: MutationTree<IAppState> = {
  applicationInitialized(state: IAppState, { data }) {
    state.data = data;
  },
};

export default {
  actions,
  mutations,
  AppState,
};

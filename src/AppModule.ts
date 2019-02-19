import { IAppState, IDisplaySession, IDisplayConference, IConferenceInformation } from '@/types';
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex';
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
  toggleFavorite({ commit }, session: IDisplaySession) {
    commit('favoriteToggled', session);
  },
};

const getters: GetterTree<IAppState, IAppState> = {
  conftitle(state) {
    return state.data.title;
  },
  information(state) : IConferenceInformation {
    if (state.data.information) {
      return state.data.information;
    }
    return {
      title:'',
      items: [],
    }
  },
};

const mutations: MutationTree<IAppState> = {
  applicationInitialized(state: IAppState, { data }) {
    state.data = data;
  },
  favoriteToggled(state, session: IDisplaySession) {
    session.favorite = !session.favorite;

    const favoriteIds = state.data.sessions
      .filter((s) => s.favorite)
      .map((s) => s.id);

    localStorage.setItem(state.data.title, JSON.stringify(favoriteIds));
  },
};

export default {
  actions,
  getters,
  mutations,
  AppState,
};

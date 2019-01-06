import {
  IAppState,
  IDisplaySession,
  IDisplaySessionGroup,
  IDisplayConference,
} from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import { SessionService } from './services/SessionService';

interface IFavoritesStates {
  sessions: IDisplaySessionGroup[];
}

const sessionsState: IFavoritesStates = {
  sessions: [],
};

function getGroupedSessions(
  conference: IDisplayConference,
): IDisplaySessionGroup[] {
  const json = localStorage.getItem(conference.title) || '[]';

  const favoriteIds = JSON.parse(json);

  const sessions = conference.sessions.filter(
    (s) => favoriteIds.indexOf(s.id) >= 0,
  );

  const service = new SessionService();
  for (const session of sessions) {
    session.favorite = true;
  }
  return service.getGroupedSession(sessions);
}

const actions: ActionTree<IFavoritesStates, IAppState> = {
  async loadSessions({ commit, rootState }) {
    const sessions = getGroupedSessions(rootState.data);
    commit('sessionsLoaded', sessions);
  },
};

const getters: GetterTree<IFavoritesStates, IAppState> = {
  groups(state) {
    return state.sessions;
  },
};

const mutations: MutationTree<IFavoritesStates> = {
  sessionsLoaded(state, sessions) {
    state.sessions = sessions;
  },
};

const moduleSessions: Module<IFavoritesStates, IAppState> = {
  namespaced: true,
  state: sessionsState,
  actions,
  getters,
  mutations,
};
export default moduleSessions;

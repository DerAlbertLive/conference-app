import { IAppState, IDisplaySession, IDisplaySessionGroup } from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import { SessionService } from './services/SessionService';

interface ISessionsState {
  sessionGroups: IDisplaySessionGroup[];
  currentSession: IDisplaySession;
  showSearch: boolean;
}

const sessionsState: ISessionsState = {
  sessionGroups: [],
  currentSession: {} as IDisplaySession,
  showSearch: false,
};

const actions: ActionTree<ISessionsState, IAppState> = {
  async loadSessions({ commit, rootState }) {
    const service = new SessionService();
    const sessions = service.getGroupedSession(rootState.data.sessions);
    commit('sessionsLoaded', sessions);
  },
  async loadSession({ commit, rootState }, sessionId: string) {
    const id = Number(sessionId);
    const session = rootState.data.sessions.find((s) => s.id === id);
    if (session) {
      commit('sessionLoaded', session);
    }
  },
  toggleSearch({ commit, state }) {
    commit('searchToggled', !state.showSearch);
  },
  search({ commit, state, rootState }, text: string) {
    const service = new SessionService();
    const sessions = service.searchSessions(rootState.data.sessions, text);
    commit('sessionsLoaded', sessions);
  },
};

const getters: GetterTree<ISessionsState, IAppState> = {
  groups(state) {
    return state.sessionGroups;
  },
  session(state) {
    return state.currentSession;
  },
  showSearch(state) {
    return state.showSearch;
  },
};

const mutations: MutationTree<ISessionsState> = {
  sessionsLoaded(state, sessions) {
    state.sessionGroups = sessions;
  },
  sessionLoaded(state, session: IDisplaySession) {
    state.currentSession = session;
  },
  searchToggled(state, showSearch: boolean) {
    state.showSearch = showSearch;
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

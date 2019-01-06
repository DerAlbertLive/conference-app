import { IAppState, IDisplaySession, IDisplaySessionGroup } from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import { SessionService } from './services/SessionService';
interface ISessionsState {
  sessions: IDisplaySessionGroup[];
  currentSession: IDisplaySession;
}

const sessionsState: ISessionsState = {
  sessions: [],
  currentSession: {} as IDisplaySession,
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
};

const getters: GetterTree<ISessionsState, IAppState> = {
  groups(state) {
    return state.sessions;
  },
  session(state) {
    return state.currentSession;
  },
};

const mutations: MutationTree<ISessionsState> = {
  sessionsLoaded(state, sessions) {
    state.sessions = sessions;
  },
  sessionLoaded(state, session: IDisplaySession) {
    state.currentSession = session;
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

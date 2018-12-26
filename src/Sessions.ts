import {
  IAppState,
  IDisplaySession,
  IDisplaySessionGroup
} from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISessionsState {
  sessions: IDisplaySessionGroup[];
  currentSession: IDisplaySession;
}

const sessionsState: ISessionsState = {
  sessions: [],
  currentSession: {} as IDisplaySession,
};

function getGroupedSessions(
  sessions: IDisplaySession[],
): IDisplaySessionGroup[] {
  const sessionGroups = new Map<string, IDisplaySession[]>();
  for (const session of sessions) {
    let groupedSession = sessionGroups.get(session.sessionTime);
    if (!groupedSession) {
      groupedSession = [];
      sessionGroups.set(session.sessionTime, groupedSession);
    }
    groupedSession.push(session);
  }
  const groupTimes = [...sessionGroups.keys()].sort();

  const result: IDisplaySessionGroup[] = [];
  for (const groupTime of groupTimes) {
    let groupedSession = sessionGroups.get(groupTime) || [];
    groupedSession = groupedSession.sort((s1, s2) =>
      s1.track.shortTitle.localeCompare(s2.track.shortTitle),
    );
    const group: IDisplaySessionGroup = {
      title: groupTime,
      sessions: groupedSession,
    };
    result.push(group);
  }
  return result;
}

const actions: ActionTree<ISessionsState, IAppState> = {
  async loadSessions({ commit, rootState }) {
    const sessions = getGroupedSessions(rootState.data.sessions);
    commit('sessionsLoaded', sessions);
  },
  async loadSession({ commit, rootState }, sessionId: string) {
    console.log('loadSession', sessionId, rootState.data);
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
    console.log('sessionLoaded', session);
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

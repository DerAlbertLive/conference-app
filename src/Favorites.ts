import {
  IAppState,
  IDisplaySession,
  IDisplaySessionGroup,
  IDisplayConference,
} from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

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

  const sessionGroups = new Map<string, IDisplaySession[]>();
  for (const session of sessions) {
    session.favorite = true;
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
  sessionLoaded(state, session: IDisplaySession) {
    console.log('sessionLoaded', session);
    state.currentSession = session;
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

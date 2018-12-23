import {
  IAppState,
  IDisplaySession,
  IDisplaySessionGroup,
  IConferenceData,
} from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISessionsState {
  groups: IDisplaySessionGroup[];
}

const sessionsState: ISessionsState = {
  groups: [],
};

function getGroups(sessions: IDisplaySession[]): IDisplaySessionGroup[] {
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

function getGroupByTime(data: IConferenceData) {
  return;
}
const actions: ActionTree<ISessionsState, IAppState> = {
  async loadGroups({ commit, rootState }) {
    const groups = getGroups(rootState.data.sessions);
    console.log('groupsLoaded', groups);

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

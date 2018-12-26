import {
  IAppState,
  IDisplaySpeaker,
  IDisplaySpeakerGroup,
  IDisplaySession,
  IDisplayConference,
} from '@/types';
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';

interface ISpeakersState {
  groups: IDisplaySpeakerGroup[];
  currentSpeaker: IDisplaySpeaker | null;
}

const stateSpeakers: ISpeakersState = {
  groups: [],
  currentSpeaker: null,
};

function getGroups(speakers: IDisplaySpeaker[]): IDisplaySpeakerGroup[] {
  const speakerMap = new Map<string, IDisplaySpeaker[]>();
  for (const speaker of speakers) {
    const group = speaker.name.substring(0, 1).toUpperCase();
    let s = speakerMap.get(group);
    if (!s) {
      s = [];
      speakerMap.set(group, s);
    }
    s.push(speaker);
  }

  const groups = [...speakerMap.keys()].sort();
  const result: IDisplaySpeakerGroup[] = [];

  for (const group of groups) {
    let s = speakerMap.get(group) || [];
    s = s.sort((a, b) => a.name.localeCompare(b.name));
    result.push({
      title: group,
      speakers: s,
    });
  }

  return result;
}

function findSpeaker(id: number, data: IDisplayConference) {
  const speaker = data.speakers.find((s) => s.id === id);
  if (!speaker) {
    return {};
  }

  return speaker;
}
const actions: ActionTree<ISpeakersState, IAppState> = {
  loadGroups({ commit, state, rootState }) {
    if (state.groups && state.groups.length > 0) {
      return;
    }

    const groups = getGroups(rootState.data.speakers);
    commit('groupsLoaded', groups);
  },
  loadSpeaker({ commit, rootState }, id: string) {
    const idNum = Number(id);
    const speaker = findSpeaker(idNum, rootState.data);
    if (speaker) {
      commit('speakerLoaded', speaker);
    }
  },
};

const getters: GetterTree<ISpeakersState, IAppState> = {
  groups(state) {
    return state.groups;
  },
  speaker(state) {
    return state.currentSpeaker || {};
  },
};
const mutations: MutationTree<ISpeakersState> = {
  groupsLoaded(state, groups: IDisplaySpeakerGroup[]) {
    state.groups = groups;
  },
  speakerLoaded(state, speaker: IDisplaySpeaker) {
    state.currentSpeaker = speaker;
  },
};

const namespaced: boolean = true;

const moduleSpeakers: Module<ISpeakersState, IAppState> = {
  namespaced,
  state: stateSpeakers,
  getters,
  actions,
  mutations,
};

export default moduleSpeakers;

import { IAppState, IDisplaySession, IDisplayConference } from '@/types';
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex';
import { SessionService } from './services/SessionService';

export const AppState: IAppState = {
  data: {} as any,
  registration: null,
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
};

function updateServiceWorker(registration: ServiceWorkerRegistration, cdata: IDisplayConference)
{
  let sw = registration.active as ServiceWorker;
  if (!sw) {
    return;
  }

  if (cdata.speakers) {
    const uris = cdata.speakers.map((s) => s.imageUrl);
  
    sw.postMessage({
      command: 'speakerImagesUpdate',
      imageUris: uris,
    });  
  }
  if (cdata.dataFiles) {
    sw.postMessage({
      command: 'conferenceDataUpdate',
      dataUris: cdata.dataFiles
    });
  
  }
}

const mutations: MutationTree<IAppState> = {
  applicationInitialized(state: IAppState, { data }) {
    state.data = data;
    console.log('applicationInitialized', state);
    if (state.registration) {
      updateServiceWorker(state.registration, state.data);
    }
  },
  favoriteToggled(state, session: IDisplaySession) {
    session.favorite = !session.favorite;

    const favoriteIds = state.data.sessions
      .filter((s) => s.favorite)
      .map((s) => s.id);

    localStorage.setItem(state.data.title, JSON.stringify(favoriteIds));
  },  
  swRegistered(state, registration: ServiceWorkerRegistration) {
    state.registration = registration;
    updateServiceWorker(state.registration, state.data);
  },
};

export default {
  actions,
  getters,
  mutations,
  AppState,
};
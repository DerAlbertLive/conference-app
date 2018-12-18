export interface IAppState {
  data: IConferenceData;  
}

export interface IConferenceData {
  title: string;
  claims: Map<string, string>;
  locations: ILocation[];
  speakers: ISpeaker[];
  tracks: ITrack[];
  sessions: ISession[];
  sessionSpeakerMaps: ISessionSpeakerMap[];
}

export interface ILocation {
  id: number;
  name: string;
}

export interface ISpeaker {
  id: number;
  name: string;
  imageUrl: string;
  social: object;
  bio: string;
}

export interface ITrack {
  id: number;
  title: string;
  shortTitle: string;
  color: string;
}

export interface ISession {
  id: number;
  trackId: number;
  locationId: number;
  title: string;
  abstract: string;
  begin: string;
  end: string;
}

export interface ISessionSpeakerMap {
  id: number;
  sessionId: number;
  speakerId: number;
}

export interface IDisplayConference {
  title: string;
  sessions: IDisplaySession[];
  speakers: IDisplaySpeaker[];
}

export interface IDisplaySession {
  id: number;
  title: string;
  speakerName: string;
  speakerImage: string;
  favorite?: boolean;
}

export interface IDisplaySessionGroup {
  title?: string;
  sessions: IDisplaySession[];
}

export interface IDisplaySpeakerGroup {
  title?: string;
  speakers: IDisplaySpeaker[];
}

export interface IDisplaySpeaker {
  id: number;
  name: string;
  imageUrl: string;
}

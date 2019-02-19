import {
  IDisplayConference,
  IConferenceData,
  IDisplaySession,
  ISession,
  ILocation,
  ITrack,
  IDisplaySpeaker,
  IConferenceInformation,
  ISpeaker,
} from '@/types.ts';

export default class SessionDataConverter {
  constructor(private data: IConferenceData) {}
  public convert(): IDisplayConference {
    const converted: IDisplayConference = {
      title: this.data.title,
      sessions: this.convertSessions(this.data.sessions),
      speakers: this.convertSpeakers(this.data.speakers),
      sessionSpeakerMaps: this.data.sessionSpeakerMaps,
      information: this.data.information || this.getDefaultInformation(),
      dataFiles: [],
    };
    this.assignSpeakersToSession(converted);
    this.assignSessionsToSpeaker(converted);
    return converted;
  }
  private getDefaultInformation(): IConferenceInformation {
    return {
      title: 'Information',
      items: [
        {
          term: 'Keine Informationen hinterlegt',
          link: {
            href: 'https://github.com/DerAlbertLive/conference-app',
            caption: 'siehe Project Site',
          },
        },
      ],
    };
  }
  private convertSpeakers(speakers: ISpeaker[]): IDisplaySpeaker[] {
    return speakers.map((s) => this.convertSpeaker(s));
  }
  private convertSpeaker(speaker: ISpeaker): IDisplaySpeaker {
    return {
      id: speaker.id,
      name: speaker.name,
      imageUrl: speaker.imageUrl,
      bio: speaker.bio,
      sessions: [],
    };
  }
  private convertSessions(sessions: ISession[]): IDisplaySession[] {
    const convertedSessions: IDisplaySession[] = [];
    for (const session of sessions) {
      convertedSessions.push(this.convertSession(session));
    }
    return convertedSessions;
  }
  private convertSession(session: ISession): IDisplaySession {
    return {
      id: session.id,
      title: session.title,
      abstract: session.abstract,
      speakers: [],
      favorite: false,
      track: this.getTrack(session.trackId),
      location: this.getLocation(session.locationId),
      sessionTime: this.getSessionTime(session.begin, session.end),
    };
  }
  private assignSessionsToSpeaker(conference: IDisplayConference) {
    for (const speaker of conference.speakers) {
      speaker.sessions = this.getSessionsForSpeaker(conference, speaker.id);
    }
  }
  private assignSpeakersToSession(conference: IDisplayConference) {
    for (const session of conference.sessions) {
      session.speakers = this.getSpeakersForSession(conference, session.id);
    }
  }
  private getSpeakersForSession(
    conference: IDisplayConference,
    sessionId: number,
  ): IDisplaySpeaker[] {
    const speakersId = conference.sessionSpeakerMaps
      .filter((m) => m.sessionId === sessionId)
      .map((m) => m.speakerId);
    return conference.speakers.filter((s) => speakersId.indexOf(s.id) >= 0);
  }
  private getSessionsForSpeaker(
    conference: IDisplayConference,
    speakerId: number,
  ) {
    const sessionIds = conference.sessionSpeakerMaps
      .filter((m) => m.speakerId === speakerId)
      .map((m) => m.sessionId);
    return conference.sessions.filter((s) => sessionIds.indexOf(s.id) >= 0);
  }
  private getSessionTime(begin: string, end: string): string {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    return `${this.getTime(beginDate)} - ${this.getTime(endDate)}`;
  }
  private getTime(date: Date): string {
    return `${this.alignNumber(date.getHours())}:${this.alignNumber(
      date.getMinutes(),
    )}`;
  }
  private alignNumber(num: number): string {
    if (num > 9) {
      return num.toString();
    }
    return `0${num}`;
  }
  private getLocation(locationId: number): ILocation {
    return (
      this.data.locations.find((l) => l.id === locationId) || {
        id: 0,
        name: 'Unkown Roome',
      }
    );
  }
  private getTrack(trackId: number): ITrack {
    return (
      this.data.tracks.find((t) => t.id === trackId) || {
        id: 0,
        title: 'Unkown Track',
        shortTitle: 'UT',
        color: '#000',
      }
    );
  }
}

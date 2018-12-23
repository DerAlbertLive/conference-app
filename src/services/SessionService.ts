import {
  IDisplayConference,
  IConferenceData,
  IDisplaySession,
  ISession,
  ILocation,
  ITrack,
  IDisplaySpeaker,
  ISpeaker,
} from '@/types.ts';

export class SessionService {
  public async getConferenceData(): Promise<IDisplayConference> {
    const response = await fetch('/data/conference.json');
    const data = (await response.json()) as IConferenceData;
    var converter = new SessionDataConverter(data);
    return converter.convert();
  }
}

export class SessionDataConverter {
  constructor(private data: IConferenceData) {}
  public convert(): IDisplayConference {
    const converted: IDisplayConference = {
      title: this.data.title,
      sessions: this.convertSessions(this.data.sessions),
      speakers: this.convertSpeakers(this.data.speakers),
      sessionSpeakerMaps: this.data.sessionSpeakerMaps,
    };
    return converted;
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
      speaker: {} as any,
      favorite: false,
      track: this.getTrack(session.trackId),
      location: this.getLocation(session.locationId),
      sessionTime: this.getSessionTime(session.begin, session.end),
    };
  }

  getSessionTime(begin: string, end: string): string {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    return `${this.getTime(beginDate)} - ${this.getTime(endDate)}`;
  }
  getTime(date: Date): string {
    return `${this.alignNumber(date.getHours())}:${this.alignNumber(
      date.getMinutes(),
    )}`;
  }

  alignNumber(num: number): string {
    if (num > 9) {
      return num.toString();
    }
    return `0${num}`;
  }

  getLocation(locationId: number): ILocation {
    return (
      this.data.locations.find((l) => l.id === locationId) || {
        id: 0,
        name: 'Unkown Roome',
      }
    );
  }
  getTrack(trackId: number): ITrack {
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

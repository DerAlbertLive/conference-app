import {
  IDisplayConference,
  IConferenceData,
  IDisplaySessionGroup,
  IDisplaySession,
  IConfiguration,
} from '@/types.ts';

import SessionDataConverter from './SessionDataConverter';

export class SessionService {
  public async getConferenceData(): Promise<IDisplayConference> {
    const configFileName = '/data/configuration.json';
    const files = await this.fetch<IConfiguration>(configFileName);

    const data = {} as IConferenceData;
    for (const file of files.files) {
      const confData = await this.fetch<IConferenceData>(file);
      Object.assign(data, confData);
    }
    const converter = new SessionDataConverter(data);
    const displayConference = converter.convert();
    displayConference.dataFiles = files.files;
    displayConference.dataFiles.push(configFileName);
    return displayConference;
  }

  public searchSessions(sessions: IDisplaySession[], searchText: string) {
    const foundSessions = sessions.filter((s) =>
      this.isSearchedSession(s, searchText),
    );
    return this.getGroupedSession(foundSessions);
  }

  public getGroupedSession(
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

  private fetch<T>(url: string): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('get', url, true);
      req.onload = () => {
        try {
          if (req.status === 200) {
            const data = JSON.parse(req.responseText);
            resolve(data);
          } else {
            reject();
          }
        } catch (e) {
          reject(e);
        }
      };
      req.send();
    });
    return promise;
  }

  private isSearchedSession(
    session: IDisplaySession,
    searchText: string,
  ): boolean {
    const regEx = new RegExp(searchText, 'i');
    if (session.abstract && session.abstract.match(regEx)) {
      return true;
    }
    if (session.title && session.title.match(regEx)) {
      return true;
    }
    for (const speaker of session.speakers) {
      if (speaker.name.match(regEx)) {
        return true;
      }
    }
    return false;
  }
}

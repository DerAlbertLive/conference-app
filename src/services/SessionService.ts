import {
  IDisplayConference,
  IConferenceData,
  IDisplaySessionGroup,
  IDisplaySession,
} from '@/types.ts';

import SessionDataConverter from './SessionDataConverter';

export class SessionService {
  public async getConferenceData(): Promise<IDisplayConference> {
    const response = await fetch('/data/conference.json');
    const data = (await response.json()) as IConferenceData;
    const converter = new SessionDataConverter(data);
    return converter.convert();
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
}

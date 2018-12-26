import { IDisplayConference, IConferenceData } from '@/types.ts';

import SessionDataConverter from './SessionDataConverter';

export class SessionService {
  public async getConferenceData(): Promise<IDisplayConference> {
    const response = await fetch('/data/conference.json');
    const data = (await response.json()) as IConferenceData;
    const converter = new SessionDataConverter(data);
    return converter.convert();
  }
}

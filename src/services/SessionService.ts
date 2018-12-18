import { IDisplayConference, IConferenceData } from '@/types.ts';

export class SessionService {
  async getConferenceData(): Promise<IDisplayConference> {
    const response = await fetch('/data/conference.json');
    const data = (await response.json()) as IConferenceData;
    return (data as unknown) as IDisplayConference; //  TODO: Convert data
  }
}

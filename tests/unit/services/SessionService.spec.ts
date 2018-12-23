import {
  IConferenceData,
  IDisplayConference,
  ITrack,
  ILocation,
  ISession,
  IDisplaySession,
} from '@/types';
import { SessionDataConverter } from '@/services/SessionService';

const loadedTracks: ITrack[] = [
  {
    id: 101,
    title: 'Track A',
    shortTitle: 'A',
    color: '#666',
  },
  {
    id: 102,
    title: 'Track B',
    shortTitle: 'B',
    color: '#aaa',
  },
  {
    id: 103,
    title: 'Track C',
    shortTitle: 'C',
    color: '#ddd',
  },
];

const loadedLocations: ILocation[] = [
  {
    id: 201,
    name: 'Raum 301',
  },
  {
    id: 202,
    name: 'Raum 7',
  },
  {
    id: 203,
    name: 'Raum 103',
  },
  {
    id: 204,
    name: 'Raum 123',
  },
];

const loadedSessions: ISession[] = [
  {
    id: 1001,
    trackId: 101,
    locationId: 201,
    title: 'Session A',
    abstract: 'Abstract A',
    begin: '2018-05-04T14:35:00+01:00', // 15:35
    end: '2018-05-04T15:35:00+01:00',  // 16:35
  },
  {
    id: 1002,
    trackId: 102,
    locationId: 202,
    title: 'Begrüßung',
    abstract: 'Hallo und Willkommen',
    begin: '2018-05-04T08:00:00+01:00', // 09:00
    end: '2018-05-04T08:15:00+01:00', // 09:15
  },
];

const loadedData: IConferenceData = {
  title: 'The Conference',
  claims: new Map<string, string>(),
  locations: loadedLocations,
  tracks: loadedTracks,
  speakers: [],
  sessions: loadedSessions,
  sessionSpeakerMaps: [],
};

describe('Convert Conference Data', () => {
  let result: IDisplayConference;
  beforeAll(() => {
    var converter = new SessionDataConverter(loadedData);
    result = converter.convert();
  });

  test('title shoudl be set', () => {
    expect(result.title).toBe('The Conference');
  });

  describe('session found', () => {
    test('should be converted 2 sessions', () => {
      expect(result.sessions.length).toBe(2);
    });

    describe('session 1', () => {
      let session: IDisplaySession;
      beforeAll(() => {
        session = result.sessions[0];
      });
      test('id should be 1001', () => {
        expect(session.id).toBe(1001);
      });
      test('title should be Session A', () => {
        expect(session.title).toBe('Session A');
      });
      test('abstract should be Abstract A', () => {
        expect(session.abstract).toBe('Abstract A');
      });
      test('track shoud be track a', () => {
        expect(session.track.title).toBe('Track A');
      });
      test('location should be Raum 301', () => {
        expect(session.location.name).toBe('Raum 301');
      });

      test('sessionTime shoud be 15:35 - 16:35', ()=>{
        expect(session.sessionTime).toBe('15:35 - 16:35');
      })
    });

    describe('session 2', () => {
      let session: IDisplaySession;
      beforeAll(() => {
        session = result.sessions[1];
      });
      test('id should be 1002', () => {
        expect(session.id).toBe(1002);
      });
      test('title should be Begrüßung', () => {
        expect(session.title).toBe('Begrüßung');
      });
      test('abstract should be Willkommen', () => {
        expect(session.abstract).toBe('Hallo und Willkommen');
      });
      test('track shoud be track B', () => {
        expect(session.track.title).toBe('Track B');
      });
      test('location should be Raum 7', () => {
        expect(session.location.name).toBe('Raum 7');
      });
      test('sessionTime shoud be 09:00 - 09:15', ()=>{
        expect(session.sessionTime).toBe('09:00 - 09:15');
      })
    });
  });
});

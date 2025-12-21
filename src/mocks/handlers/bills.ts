import { http, HttpResponse, delay } from 'msw';
import { billSubjectsResponse } from '../data/fixtures/scenarios';
import { mockDelay } from '../utils/delay';

export const billHandlers = [
  // GET /api/bills/subjects
  http.get('*/api/bills/subjects', async () => {
    await delay(mockDelay());

    return HttpResponse.json(billSubjectsResponse);
  }),
];

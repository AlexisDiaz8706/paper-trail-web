import type { VoteDateRangeResponse } from '@/types/api';

export function createVoteDateRangeResponse(): VoteDateRangeResponse {
  return {
    earliest_vote: '2010-01-03',
    latest_vote: '2024-12-15',
    congress_sessions: [
      { congress: 117, start: '2021-01-03', end: '2023-01-03' },
      { congress: 118, start: '2023-01-03', end: '2025-01-03' },
    ],
  };
}

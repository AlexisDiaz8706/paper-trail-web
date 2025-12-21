import { http, HttpResponse, delay } from 'msw';
import type { VoteParams } from '@/types/api';
import {
  createPolitician,
  createPoliticians,
  createVoteDateRangeResponse,
  createDonationSummaries,
} from '../data/factories';
import { politicians, donationSummaries } from '../data/fixtures';
import { createPaginatedVotesScenario, createTopicFilteredDonationsScenario } from '../data/fixtures/scenarios';
import { mockDelay } from '../utils/delay';

// Create a map of known politicians for consistent responses
const knownPoliticians = new Map(
  Object.values(politicians).map((p) => [p.canonical_id, p])
);

export const politicianHandlers = [
  // GET /api/politicians/search?name=<query>
  http.get('*/api/politicians/search', async ({ request }) => {
    await delay(mockDelay());

    const url = new URL(request.url);
    const name = url.searchParams.get('name') ?? '';

    if (name.length < 2) {
      return HttpResponse.json([]);
    }

    // Check if searching for known fixture politicians
    const lowerName = name.toLowerCase();
    const matchingFixtures = Object.values(politicians).filter(
      (p) =>
        p.full_name.toLowerCase().includes(lowerName) ||
        p.last_name.toLowerCase().includes(lowerName) ||
        p.first_name.toLowerCase().includes(lowerName)
    );

    if (matchingFixtures.length > 0) {
      return HttpResponse.json(matchingFixtures);
    }

    // Generate random politicians for other searches
    const results = createPoliticians(5).map((p, i) => ({
      ...p,
      full_name: `${name} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][i]}`,
      last_name: ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][i],
      first_name: name,
    }));

    return HttpResponse.json(results);
  }),

  // GET /api/politician/:id
  http.get('*/api/politician/:id', async ({ params }) => {
    await delay(mockDelay());

    const { id } = params;
    const politicianId = id as string;

    // Return known fixture if exists
    const knownPolitician = knownPoliticians.get(politicianId);
    if (knownPolitician) {
      return HttpResponse.json(knownPolitician);
    }

    // Generate a politician with the requested ID
    return HttpResponse.json(createPolitician({ canonical_id: politicianId }));
  }),

  // GET /api/politician/:id/votes
  http.get('*/api/politician/:id/votes', async ({ request, params }) => {
    await delay(mockDelay(150, 500));

    const url = new URL(request.url);
    const { id } = params;
    const politicianId = id as string;

    // Parse query parameters
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const sort = (url.searchParams.get('sort') as VoteParams['sort']) ?? 'DESC';
    // Note: date_from, date_to, and type params are received but not used in mock filtering
    const voteValues = url.searchParams.getAll('vote_value');
    const subjects = url.searchParams.getAll('subject');
    const search = url.searchParams.get('search');

    // Use paginated scenario for realistic multi-page responses
    const response = createPaginatedVotesScenario(page, politicianId);

    // Apply filters to the votes (simplified filtering for mock)
    let filteredVotes = response.votes;

    if (voteValues.length > 0) {
      filteredVotes = filteredVotes.filter((v) =>
        voteValues.includes(v.vote_value)
      );
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredVotes = filteredVotes.filter(
        (v) =>
          v.bill_number?.toLowerCase().includes(lowerSearch) ||
          v.bill_description?.toLowerCase().includes(lowerSearch)
      );
    }

    if (subjects.length > 0) {
      filteredVotes = filteredVotes.filter((v) =>
        v.topics.some((t) => subjects.includes(t.label))
      );
    }

    // Sort by date
    filteredVotes.sort((a, b) => {
      const dateA = new Date(a.vote_date).getTime();
      const dateB = new Date(b.vote_date).getTime();
      return sort === 'ASC' ? dateA - dateB : dateB - dateA;
    });

    return HttpResponse.json({
      ...response,
      votes: filteredVotes,
      pagination: {
        ...response.pagination,
        totalVotes: filteredVotes.length > 0 ? response.pagination.totalVotes : 0,
      },
    });
  }),

  // GET /api/politician/:id/votes/date-range
  http.get('*/api/politician/:id/votes/date-range', async () => {
    await delay(mockDelay());

    return HttpResponse.json(createVoteDateRangeResponse());
  }),

  // GET /api/politician/:id/donations/summary
  http.get('*/api/politician/:id/donations/summary', async ({ params }) => {
    await delay(mockDelay());

    const { id } = params;
    const politicianId = id as string;

    // Return fixture data for known politicians
    if (knownPoliticians.has(politicianId)) {
      return HttpResponse.json(Object.values(donationSummaries));
    }

    // Generate random donation summaries
    return HttpResponse.json(createDonationSummaries());
  }),

  // GET /api/politician/:id/donations/summary/filtered?topic=<topic>
  http.get('*/api/politician/:id/donations/summary/filtered', async ({ request }) => {
    await delay(mockDelay());

    const url = new URL(request.url);
    const topic = url.searchParams.get('topic') ?? 'Unknown';

    // Use scenario for realistic topic-filtered responses
    const response = createTopicFilteredDonationsScenario(topic);

    return HttpResponse.json(response);
  }),
];

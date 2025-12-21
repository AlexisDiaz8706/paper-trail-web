import { http, HttpResponse, delay } from 'msw';
import { createDonor, createDonors, createDonations } from '../data/factories';
import { donors } from '../data/fixtures';
import { createDonorDonationsScenario } from '../data/fixtures/scenarios';
import { mockDelay } from '../utils/delay';

// Create a map of known donors for consistent responses
const knownDonors = new Map(
  Object.values(donors).map((d) => [d.donor_id, d])
);

export const donorHandlers = [
  // GET /api/donors/search?name=<query>
  http.get('*/api/donors/search', async ({ request }) => {
    await delay(mockDelay());

    const url = new URL(request.url);
    const name = url.searchParams.get('name') ?? '';

    if (name.length < 3) {
      return HttpResponse.json([]);
    }

    // Check if searching for known fixture donors
    const lowerName = name.toLowerCase();
    const matchingFixtures = Object.values(donors).filter((d) =>
      d.name.toLowerCase().includes(lowerName)
    );

    if (matchingFixtures.length > 0) {
      return HttpResponse.json(matchingFixtures);
    }

    // Generate random donors for other searches
    const results = createDonors(5).map((d, i) => ({
      ...d,
      name: `${name} ${['PAC', 'Foundation', 'Group', 'Committee', 'Fund'][i]}`,
    }));

    return HttpResponse.json(results);
  }),

  // GET /api/donor/:id
  http.get('*/api/donor/:id', async ({ params }) => {
    await delay(mockDelay());

    const { id } = params;
    const donorId = id as string;

    // Return known fixture if exists
    const knownDonor = knownDonors.get(donorId);
    if (knownDonor) {
      return HttpResponse.json(knownDonor);
    }

    // Generate a donor with the requested ID
    return HttpResponse.json(createDonor({ donor_id: donorId }));
  }),

  // GET /api/donor/:id/donations
  http.get('*/api/donor/:id/donations', async ({ params }) => {
    await delay(mockDelay(200, 600));

    const { id } = params;
    const donorId = id as string;

    // Return scenario data for known donors
    if (knownDonors.has(donorId)) {
      return HttpResponse.json(createDonorDonationsScenario(donorId));
    }

    // Generate random donations for unknown donors
    const donationCount = Math.floor(Math.random() * 20) + 5;
    return HttpResponse.json(createDonations(donationCount));
  }),
];

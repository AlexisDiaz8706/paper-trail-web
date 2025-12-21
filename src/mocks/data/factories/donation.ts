import type { Donation, DonationSummary } from '@/types/api';

const INDUSTRIES = [
  'Finance/Insurance',
  'Health',
  'Energy',
  'Defense',
  'Real Estate',
  'Communications/Electronics',
  'Transportation',
  'Agribusiness',
  'Construction',
  'Lawyers & Lobbyists',
  'Labor',
  'Misc Business',
  'Ideology/Single-Issue',
];

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const PARTIES = ['D', 'R', 'I'] as const;

const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis'];

let transactionIdCounter = 1;

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function createDonationSummary(overrides: Partial<DonationSummary> = {}): DonationSummary {
  const contributionCount = randomAmount(10, 500);
  const avgAmount = randomAmount(500, 5000);

  return {
    industry: randomElement(INDUSTRIES),
    contribution_count: contributionCount,
    total_amount: contributionCount * avgAmount,
    avg_amount: avgAmount,
    ...overrides,
  };
}

export function createDonationSummaries(count?: number): DonationSummary[] {
  const industries = count ? INDUSTRIES.slice(0, count) : INDUSTRIES;
  return industries.map((industry) => createDonationSummary({ industry }));
}

function createDonation(overrides: Partial<Donation> = {}): Donation {
  const id = transactionIdCounter++;
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);

  return {
    transaction_id: `txn${id.toString().padStart(8, '0')}`,
    amount: randomAmount(100, 10000),
    transaction_date: randomDate(new Date('2010-01-01'), new Date('2024-12-31')),
    industry: randomElement(INDUSTRIES),
    election_cycle: 2020 + Math.floor(Math.random() * 3) * 2, // 2020, 2022, 2024
    canonical_id: 'cand0001',
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`,
    party: randomElement(PARTIES),
    state: randomElement(STATES),
    ...overrides,
  };
}

export function createDonations(count: number, overrides: Partial<Donation> = {}): Donation[] {
  return Array.from({ length: count }, () => createDonation(overrides));
}

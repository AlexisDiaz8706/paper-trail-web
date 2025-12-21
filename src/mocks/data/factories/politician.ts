import type { Politician } from '@/types/api';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const FIRST_NAMES = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Lisa', 'Daniel', 'Nancy',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
];

const PARTIES = ['D', 'R', 'I'] as const;
const SEATS = ['House', 'Senate'] as const;

let idCounter = 1;

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function createPolitician(overrides: Partial<Politician> = {}): Politician {
  const id = idCounter++;
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const state = randomElement(STATES);
  const party = randomElement(PARTIES);
  const seat = randomElement(SEATS);

  return {
    canonical_id: `cand${id.toString().padStart(4, '0')}`,
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`,
    party,
    state,
    seat,
    is_active: Math.random() > 0.15, // 85% active
    bioguide_id: `${lastName.charAt(0).toUpperCase()}${id.toString().padStart(6, '0')}`,
    icpsr_id: 10000 + id,
    fec_candidate_id: `H${state}${id.toString().padStart(5, '0')}`,
    nominate_dim1: Math.random() * 2 - 1, // -1 to 1
    nominate_dim2: Math.random() * 2 - 1,
    first_elected_year: 2000 + Math.floor(Math.random() * 24),
    last_elected_year: 2022 + Math.floor(Math.random() * 3),
    ...overrides,
  };
}

export function createPoliticians(count: number, overrides: Partial<Politician> = {}): Politician[] {
  return Array.from({ length: count }, () => createPolitician(overrides));
}

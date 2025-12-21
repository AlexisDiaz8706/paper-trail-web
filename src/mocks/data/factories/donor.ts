import type { Donor } from '@/types/api';

const DONOR_TYPES = ['Individual', 'PAC', 'Corporation', 'Labor Union', 'Trade Association'] as const;

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
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
];

const COMPANIES = [
  'Acme Corp', 'GlobalTech Industries', 'First National Bank', 'United Healthcare',
  'Energy Solutions Inc', 'Pharma Plus', 'Defense Systems LLC', 'Real Estate Holdings',
  'Insurance Partners', 'Consulting Group', 'Manufacturing Co', 'Financial Services',
];

const OCCUPATIONS = [
  'CEO', 'Attorney', 'Physician', 'Real Estate Developer', 'Investment Banker',
  'Lobbyist', 'Consultant', 'Business Owner', 'Executive', 'Retired',
];

const PAC_SUFFIXES = ['PAC', 'Political Action Committee', 'Victory Fund', 'Leadership PAC'];

let idCounter = 1;

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDonorName(type: string): string {
  if (type === 'Individual') {
    return `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`;
  }
  if (type === 'PAC') {
    return `${randomElement(COMPANIES)} ${randomElement(PAC_SUFFIXES)}`;
  }
  return randomElement(COMPANIES);
}

export function createDonor(overrides: Partial<Donor> = {}): Donor {
  const id = idCounter++;
  const donorType = randomElement(DONOR_TYPES);
  const isIndividual = donorType === 'Individual';

  const contributionCount = randomAmount(1, 200);
  const avgContribution = randomAmount(100, 5000);

  return {
    donor_id: `donor${id.toString().padStart(5, '0')}`,
    name: generateDonorName(donorType),
    donor_type: donorType,
    employer: isIndividual ? randomElement(COMPANIES) : null,
    occupation: isIndividual ? randomElement(OCCUPATIONS) : null,
    state: randomElement(STATES),
    total_contributions_count: contributionCount,
    total_amount: contributionCount * avgContribution,
    ...overrides,
  };
}

export function createDonors(count: number, overrides: Partial<Donor> = {}): Donor[] {
  return Array.from({ length: count }, () => createDonor(overrides));
}

import type { Politician, Donor, DonationSummary } from '@/types/api';

/**
 * Named fixtures for consistent testing scenarios
 * Use these when you need predictable, well-defined test data
 */

// =============================================================================
// Politicians
// =============================================================================

export const politicians = {
  /** Active Democrat Senator from New York */
  senatorSmithNY: {
    canonical_id: 'cand0001',
    first_name: 'Jane',
    last_name: 'Smith',
    full_name: 'Jane Smith',
    party: 'D',
    state: 'NY',
    seat: 'Senate',
    is_active: true,
    bioguide_id: 'S000001',
    icpsr_id: 10001,
    fec_candidate_id: 'S4NY00001',
    nominate_dim1: -0.42,
    nominate_dim2: 0.15,
    first_elected_year: 2012,
    last_elected_year: 2024,
  } satisfies Politician,

  /** Active Republican Representative from Texas */
  repJohnsonTX: {
    canonical_id: 'cand0002',
    first_name: 'Robert',
    last_name: 'Johnson',
    full_name: 'Robert Johnson',
    party: 'R',
    state: 'TX',
    seat: 'House',
    is_active: true,
    bioguide_id: 'J000002',
    icpsr_id: 10002,
    fec_candidate_id: 'H8TX00002',
    nominate_dim1: 0.65,
    nominate_dim2: -0.22,
    first_elected_year: 2016,
    last_elected_year: 2024,
  } satisfies Politician,

  /** Retired former Senator from California */
  senatorRetiredCA: {
    canonical_id: 'cand0003',
    first_name: 'Michael',
    last_name: 'Williams',
    full_name: 'Michael Williams',
    party: 'D',
    state: 'CA',
    seat: 'Senate',
    is_active: false,
    bioguide_id: 'W000003',
    icpsr_id: 10003,
    first_elected_year: 1998,
    last_elected_year: 2016,
  } satisfies Politician,

  /** First-term Representative from Florida with limited voting history */
  repNewbieFL: {
    canonical_id: 'cand0004',
    first_name: 'Emily',
    last_name: 'Davis',
    full_name: 'Emily Davis',
    party: 'R',
    state: 'FL',
    seat: 'House',
    is_active: true,
    bioguide_id: 'D000004',
    icpsr_id: 10004,
    fec_candidate_id: 'H4FL00004',
    first_elected_year: 2022,
    last_elected_year: 2024,
  } satisfies Politician,

  /** Moderate Senator from Ohio with centrist voting record */
  senatorModerateOH: {
    canonical_id: 'cand0005',
    first_name: 'Christopher',
    last_name: 'Brown',
    full_name: 'Christopher Brown',
    party: 'D',
    state: 'OH',
    seat: 'Senate',
    is_active: true,
    bioguide_id: 'B000005',
    icpsr_id: 10005,
    fec_candidate_id: 'S6OH00005',
    nominate_dim1: -0.08,
    nominate_dim2: 0.02,
    first_elected_year: 2018,
    last_elected_year: 2024,
  } satisfies Politician,

  /** Independent Senator from Vermont */
  senatorIndependentVT: {
    canonical_id: 'cand0006',
    first_name: 'Bernard',
    last_name: 'Sanders',
    full_name: 'Bernard Sanders',
    party: 'I',
    state: 'VT',
    seat: 'Senate',
    is_active: true,
    bioguide_id: 'S000006',
    icpsr_id: 10006,
    nominate_dim1: -0.75,
    nominate_dim2: 0.35,
    first_elected_year: 2006,
    last_elected_year: 2024,
  } satisfies Politician,
} as const;

// =============================================================================
// Donors
// =============================================================================

export const donors = {
  /** Large corporate PAC with extensive contribution history */
  bigCorpPAC: {
    donor_id: 'donor00001',
    name: 'Goldman Sachs Group PAC',
    donor_type: 'PAC',
    employer: null,
    occupation: null,
    state: 'NY',
    total_contributions_count: 156,
    total_amount: 524000,
  } satisfies Donor,

  /** Small individual donor with minimal contributions */
  smallDonorIndividual: {
    donor_id: 'donor00002',
    name: 'John Q. Public',
    donor_type: 'Individual',
    employer: 'Self-Employed',
    occupation: 'Business Owner',
    state: 'OH',
    total_contributions_count: 3,
    total_amount: 500,
  } satisfies Donor,

  /** Energy sector lobbyist with consistent donations */
  industryLobbyist: {
    donor_id: 'donor00003',
    name: 'American Petroleum Institute PAC',
    donor_type: 'PAC',
    employer: null,
    occupation: null,
    state: 'DC',
    total_contributions_count: 89,
    total_amount: 312000,
  } satisfies Donor,

  /** Out-of-state donor contributing to non-local candidates */
  outOfStateDonor: {
    donor_id: 'donor00004',
    name: 'Tech Industry Executive',
    donor_type: 'Individual',
    employer: 'Silicon Valley Tech Corp',
    occupation: 'CEO',
    state: 'CA',
    total_contributions_count: 24,
    total_amount: 86400,
  } satisfies Donor,

  /** Healthcare industry PAC */
  healthcarePAC: {
    donor_id: 'donor00005',
    name: 'American Medical Association PAC',
    donor_type: 'PAC',
    employer: null,
    occupation: null,
    state: 'IL',
    total_contributions_count: 203,
    total_amount: 678500,
  } satisfies Donor,

  /** Labor union political action committee */
  laborUnionPAC: {
    donor_id: 'donor00006',
    name: 'AFL-CIO Committee on Political Education',
    donor_type: 'Labor Union',
    employer: null,
    occupation: null,
    state: 'DC',
    total_contributions_count: 312,
    total_amount: 892000,
  } satisfies Donor,
} as const;


// =============================================================================
// Donation Summaries (by industry)
// =============================================================================

export const donationSummaries = {
  financeIndustry: {
    industry: 'Finance/Insurance',
    contribution_count: 89,
    total_amount: 245000,
    avg_amount: 2753,
  } satisfies DonationSummary,

  healthIndustry: {
    industry: 'Health',
    contribution_count: 67,
    total_amount: 178500,
    avg_amount: 2664,
  } satisfies DonationSummary,

  energyIndustry: {
    industry: 'Energy',
    contribution_count: 45,
    total_amount: 156000,
    avg_amount: 3467,
  } satisfies DonationSummary,

  defenseIndustry: {
    industry: 'Defense',
    contribution_count: 32,
    total_amount: 112000,
    avg_amount: 3500,
  } satisfies DonationSummary,

  laborIndustry: {
    industry: 'Labor',
    contribution_count: 156,
    total_amount: 234000,
    avg_amount: 1500,
  } satisfies DonationSummary,
} as const;

// =============================================================================
// Bill Subjects
// =============================================================================

export const billSubjects = [
  'Health',
  'Finance/Insurance',
  'Energy',
  'Defense',
  'Education',
  'Environment',
  'Transportation',
  'Agriculture',
  'Labor',
  'Foreign Affairs',
  'Judiciary',
  'Government Operations',
  'Science & Technology',
  'Commerce',
  'Housing',
] as const;

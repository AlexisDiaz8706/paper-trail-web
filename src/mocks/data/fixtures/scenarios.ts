import type { VoteResponse, Donation, DonationSummary, BillSubjectsResponse } from '@/types/api';
import type { Vote } from '@/types/api';
import { politicians, billSubjects } from './index';

/**
 * Pre-built scenarios for testing specific use cases
 */

// =============================================================================
// Vote Scenarios
// =============================================================================

/** Paginated votes scenario - for testing pagination with 200+ votes */
export function createPaginatedVotesScenario(
  page: number,
  politicianId: string
): VoteResponse {
  const totalVotes = 247;
  const votesPerPage = 20;
  const totalPages = Math.ceil(totalVotes / votesPerPage);

  const startVoteId = (page - 1) * votesPerPage + 1;
  const votesOnThisPage = Math.min(votesPerPage, totalVotes - (page - 1) * votesPerPage);

  const pageVotes: Vote[] = Array.from({ length: votesOnThisPage }, (_, i) => ({
    canonical_id: politicianId,
    vote_id: startVoteId + i,
    vote_value: ['Yea', 'Nay', 'Present', 'Not Voting'][Math.floor(Math.random() * 4)] as Vote['vote_value'],
    rollcall_id: 1000 + startVoteId + i,
    congress: 117 + Math.floor(i / 50),
    chamber: 'Senate',
    rollnumber: startVoteId + i,
    bill_number: `S. ${1000 + startVoteId + i}`,
    bill_description: `Test bill description ${startVoteId + i}`,
    vote_date: new Date(2021, 0, 1 + i).toISOString().split('T')[0],
    vote_result: 'Passed',
    has_topics: i % 3 !== 0,
    topics: i % 3 !== 0 ? [{ label: 'Health', source: 'CBP' as const, weight: 0.8, is_primary: true }] : [],
  }));

  return {
    pagination: {
      currentPage: page,
      totalPages,
      totalVotes,
    },
    votes: pageVotes,
    metadata: {
      topic_coverage: 'Topics available for 2003-2014 bills',
    },
  };
}

// =============================================================================
// Donation Scenarios
// =============================================================================

/** Donations mapped to bill subjects - for testing topic-filtered donations */
export function createTopicFilteredDonationsScenario(
  topic: string
): { data: DonationSummary[]; metadata: { topic: string; industries_included: string[]; topic_coverage_warning: string } } {
  const topicToIndustries: Record<string, string[]> = {
    'Health': ['Health', 'Finance/Insurance', 'Lawyers & Lobbyists'],
    'Energy': ['Energy', 'Misc Business', 'Transportation'],
    'Defense': ['Defense', 'Communications/Electronics'],
    'Finance/Insurance': ['Finance/Insurance', 'Real Estate', 'Lawyers & Lobbyists'],
    'Labor': ['Labor', 'Construction', 'Transportation'],
  };

  const industries = topicToIndustries[topic] ?? ['Misc Business'];

  const data: DonationSummary[] = industries.map((industry) => ({
    industry,
    contribution_count: Math.floor(Math.random() * 100) + 10,
    total_amount: Math.floor(Math.random() * 200000) + 50000,
    avg_amount: Math.floor(Math.random() * 3000) + 1000,
  }));

  return {
    data,
    metadata: {
      topic,
      industries_included: industries,
      topic_coverage_warning: 'Topics available for 2003-2014 bills',
    },
  };
}

/** Donations from a specific donor to multiple politicians */
export function createDonorDonationsScenario(donorId: string): Donation[] {
  const targetPoliticians = [
    politicians.senatorSmithNY,
    politicians.repJohnsonTX,
    politicians.senatorModerateOH,
  ];

  return targetPoliticians.flatMap((politician, idx) =>
    Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      transaction_id: `txn_${donorId}_${idx}_${i}`,
      amount: Math.floor(Math.random() * 5000) + 500,
      transaction_date: new Date(2020 + Math.floor(i / 2), i % 12, 1).toISOString().split('T')[0],
      industry: 'Finance/Insurance',
      election_cycle: 2020 + Math.floor(i / 2) * 2,
      canonical_id: politician.canonical_id,
      first_name: politician.first_name,
      last_name: politician.last_name,
      full_name: politician.full_name,
      party: politician.party,
      state: politician.state,
    }))
  );
}

// =============================================================================
// Bill Subjects Scenario
// =============================================================================

export const billSubjectsResponse: BillSubjectsResponse = {
  subjects: [...billSubjects],
  total_subjects: billSubjects.length,
  by_source: {
    CBP: [
      { subject: 'Health', count: 2456 },
      { subject: 'Finance/Insurance', count: 1823 },
      { subject: 'Defense', count: 1567 },
      { subject: 'Energy', count: 1234 },
      { subject: 'Education', count: 1089 },
    ],
    DIME: [
      { subject: 'Labor', count: 892 },
      { subject: 'Environment', count: 756 },
      { subject: 'Transportation', count: 623 },
    ],
    CongressGov: [
      { subject: 'Foreign Affairs', count: 534 },
      { subject: 'Judiciary', count: 467 },
      { subject: 'Agriculture', count: 389 },
    ],
  },
  metadata: {
    coverage: 'Topic data available for bills from 2003-2014',
    sources: {
      CBP: 'Congressional Bills Project - Primary policy area classifications',
      DIME: 'Database on Ideology, Money in Politics, and Elections',
      CongressGov: 'Official Congress.gov subject terms',
    },
  },
};

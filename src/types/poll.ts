export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  category: string;
  allowMultipleVotes: boolean;
  createdBy: string;
}

export interface CreatePollData {
  title: string;
  description: string;
  options: string[];
  expiresAt?: string;
  category: string;
  allowMultipleVotes: boolean;
}

export interface VoteData {
  pollId: string;
  optionIds: string[];
}

export interface PollOptionEdit {
  id?: string;
  text: string;
  isNew?: boolean;
}

export interface EditPollData {
  id: string;
  title: string;
  description: string;
  options: PollOptionEdit[];
  endDate?: string;
}

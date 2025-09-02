import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VotingForm } from '@/src/components/polls/VotingForm';

describe('VotingForm', () => {
  const mockOptions = [
    { id: 'opt-1', text: 'Option 1', votes: 5 },
    { id: 'opt-2', text: 'Option 2', votes: 3 },
    { id: 'opt-3', text: 'Option 3', votes: 2 }
  ];

  const mockTotalVotes = 10;
  const mockOnVote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all poll options', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('shows vote counts for each option', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    expect(screen.getByText(/5.*votes/)).toBeInTheDocument();
    expect(screen.getByText(/3.*votes/)).toBeInTheDocument();
    expect(screen.getByText(/2.*votes/)).toBeInTheDocument();
  });

  it('calculates and displays vote percentages correctly', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    // Option 1: 5/10 = 50%
    expect(screen.getByText(/50%/)).toBeInTheDocument();
    // Option 2: 3/10 = 30%
    expect(screen.getByText(/30%/)).toBeInTheDocument();
    // Option 3: 2/10 = 20%
    expect(screen.getByText(/20%/)).toBeInTheDocument();
  });

  it('calls onVote when an option is selected and submitted', async () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    // Select an option
    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);

    // Submit the vote
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnVote).toHaveBeenCalledWith('opt-1');
    });
  });

  it('shows results after voting', async () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    // Select an option and submit
    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);
    
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('📊 Vote Results')).toBeInTheDocument();
      expect(screen.getByText('Current Results')).toBeInTheDocument();
      expect(screen.getByText('Based on 10 total votes')).toBeInTheDocument();
    });
  });

  it('disables submit button when no option is selected', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when an option is selected', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);

    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('shows poll results when poll is not active', () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={false}
      />
    );

    expect(screen.getByText('Poll Results')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('5 votes')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('handles polls with no votes', () => {
    const pollWithNoVotes = [
      { id: 'opt-1', text: 'Option 1', votes: 0 },
      { id: 'opt-2', text: 'Option 2', votes: 0 }
    ];

    render(
      <VotingForm 
        options={pollWithNoVotes} 
        totalVotes={0} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    expect(screen.getAllByText(/0.*votes/)).toHaveLength(2);
    expect(screen.getAllByText(/0%/)).toHaveLength(2);
  });

  it('allows voting again after reset', async () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    // Vote first time
    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);
    
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('📊 Vote Results')).toBeInTheDocument();
    });

    // Click vote again button
    const voteAgainButton = screen.getByRole('button', { name: /vote again/i });
    fireEvent.click(voteAgainButton);

    // Should be back to voting form
    expect(screen.getByText('Cast Your Vote')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit vote/i })).toBeDisabled();
  });

  it('shows total votes count in results', async () => {
    render(
      <VotingForm 
        options={mockOptions} 
        totalVotes={mockTotalVotes} 
        onVote={mockOnVote} 
        isActive={true}
      />
    );

    // Vote to see results
    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);
    
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('10')).toHaveLength(2); // There are two "10" elements
      expect(screen.getByText('Total Votes')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Options')).toBeInTheDocument();
    });
  });
});

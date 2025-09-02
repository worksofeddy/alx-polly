"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Poll, CreatePollData } from "@/src/types/poll";

export async function createPoll(data: CreatePollData, userId: string) {
  try {
    const supabase = createClient();
    
    // Validate input
    if (!data.title?.trim() || !data.description?.trim() || !data.options?.length) {
      throw new Error("Title, description, and at least 2 options are required");
    }

    if (data.options.length < 2) {
      throw new Error("At least 2 options are required");
    }

    // Create poll
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        title: data.title.trim(),
        description: data.description.trim(),
        end_date: data.endDate || null,
        user_id: userId
      })
      .select()
      .single();

    if (pollError) throw pollError;

    // Create options
    const optionsData = data.options
      .filter(opt => opt.trim())
      .map(option => ({
        text: option.trim(),
        poll_id: poll.id
      }));

    const { error: optionsError } = await supabase
      .from('options')
      .insert(optionsData);

    if (optionsError) throw optionsError;

    revalidatePath('/polls');
    return { success: true, pollId: poll.id };
  } catch (error) {
    console.error('Error creating poll:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updatePoll(pollId: string, data: Partial<CreatePollData>, userId: string) {
  try {
    const supabase = createClient();
    
    // Check if user owns the poll
    const { data: existingPoll, error: fetchError } = await supabase
      .from('polls')
      .select('user_id')
      .eq('id', pollId)
      .single();

    if (fetchError) throw new Error('Poll not found');
    if (existingPoll.user_id !== userId) throw new Error('Unauthorized');

    // Update poll
    const updateData: any = {};
    if (data.title) updateData.title = data.title.trim();
    if (data.description) updateData.description = data.description.trim();
    if (data.endDate !== undefined) updateData.end_date = data.endDate;

    const { error: pollError } = await supabase
      .from('polls')
      .update(updateData)
      .eq('id', pollId);

    if (pollError) throw pollError;

    // Update options if provided
    if (data.options) {
      // Delete existing options
      await supabase
        .from('options')
        .delete()
        .eq('poll_id', pollId);

      // Insert new options
      const optionsData = data.options
        .filter(opt => opt.trim())
        .map(option => ({
          text: option.trim(),
          poll_id: pollId
        }));

      const { error: optionsError } = await supabase
        .from('options')
        .insert(optionsData);

      if (optionsError) throw optionsError;
    }

    revalidatePath('/polls');
    revalidatePath(`/polls/${pollId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating poll:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deletePoll(pollId: string, userId: string) {
  try {
    const supabase = createClient();
    
    // Check if user owns the poll
    const { data: existingPoll, error: fetchError } = await supabase
      .from('polls')
      .select('user_id')
      .eq('id', pollId)
      .single();

    if (fetchError) throw new Error('Poll not found');
    if (existingPoll.user_id !== userId) throw new Error('Unauthorized');

    // Delete poll (options and votes will be cascaded)
    const { error: deleteError } = await supabase
      .from('polls')
      .delete()
      .eq('id', pollId);

    if (deleteError) throw deleteError;

    revalidatePath('/polls');
    return { success: true };
  } catch (error) {
    console.error('Error deleting poll:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function voteOnPoll(pollId: string, optionId: string, userId: string) {
  try {
    const supabase = createClient();
    
    // Check if poll exists and is active
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .select('end_date')
      .eq('id', pollId)
      .single();

    if (pollError) throw new Error('Poll not found');
    
    if (poll.end_date && new Date(poll.end_date) < new Date()) {
      throw new Error('Poll has ended');
    }

    // Check if user already voted on this poll
    const { data: existingVote, error: voteCheckError } = await supabase
      .from('votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('user_id', userId)
      .single();

    if (existingVote) {
      throw new Error('You have already voted on this poll');
    }

    // Create vote
    const { error: voteError } = await supabase
      .from('votes')
      .insert({
        poll_id: pollId,
        option_id: optionId,
        user_id: userId
      });

    if (voteError) throw voteError;

    revalidatePath(`/polls/${pollId}`);
    return { success: true };
  } catch (error) {
    console.error('Error voting on poll:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getPoll(pollId: string) {
  try {
    const supabase = createClient();
    
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .select(`
        *,
        options (*)
      `)
      .eq('id', pollId)
      .single();

    if (pollError) throw pollError;

    // Get vote counts for each option
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select('option_id')
      .eq('poll_id', pollId);

    if (votesError) throw votesError;

    // Calculate vote counts
    const voteCounts = votes.reduce((acc: Record<string, number>, vote) => {
      acc[vote.option_id] = (acc[vote.option_id] || 0) + 1;
      return acc;
    }, {});

    // Transform to match Poll interface
    const transformedPoll: Poll = {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        votes: voteCounts[option.id] || 0
      })),
      totalVotes: votes.length,
      createdAt: poll.created_at,
      expiresAt: poll.end_date,
      isActive: !poll.end_date || new Date(poll.end_date) > new Date(),
      category: 'General', // Default category
      allowMultipleVotes: false, // Default to false
      createdBy: poll.user_id
    };

    return { success: true, poll: transformedPoll };
  } catch (error) {
    console.error('Error fetching poll:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getPolls(userId?: string) {
  try {
    const supabase = createClient();
    
    let query = supabase
      .from('polls')
      .select(`
        *,
        options (*)
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: polls, error: pollsError } = await query;

    if (pollsError) throw pollsError;

    // Get vote counts for all polls
    const { data: allVotes, error: votesError } = await supabase
      .from('votes')
      .select('poll_id, option_id');

    if (votesError) throw votesError;

    // Calculate vote counts per poll
    const voteCounts = allVotes.reduce((acc: Record<string, Record<string, number>>, vote) => {
      if (!acc[vote.poll_id]) acc[vote.poll_id] = {};
      acc[vote.poll_id][vote.option_id] = (acc[vote.poll_id][vote.option_id] || 0) + 1;
      return acc;
    }, {});

    // Transform to match Poll interface
    const transformedPolls: Poll[] = polls.map((poll: any) => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        votes: voteCounts[poll.id]?.[option.id] || 0
      })),
      totalVotes: Object.values(voteCounts[poll.id] || {}).reduce((sum: number, count: any) => sum + count, 0),
      createdAt: poll.created_at,
      expiresAt: poll.end_date,
      isActive: !poll.end_date || new Date(poll.end_date) > new Date(),
      category: 'General', // Default category
      allowMultipleVotes: false, // Default to false
      createdBy: poll.user_id
    }));

    return { success: true, polls: transformedPolls };
  } catch (error) {
    console.error('Error fetching polls:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

import { createPoll } from '@/app/actions/poll-actions';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/lib/supabase/server');
jest.mock('next/cache');

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
const mockRevalidatePath = revalidatePath as jest.MockedFunction<typeof revalidatePath>;

describe('createPoll - Unit Tests', () => {
  let mockSupabase: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a simpler mock structure
    mockSupabase = {
      from: jest.fn(),
    };

    mockCreateClient.mockReturnValue(mockSupabase);
  });

  describe('Happy Path Tests', () => {
    const validPollData = {
      title: 'Test Poll',
      description: 'Test Description',
      options: ['Option 1', 'Option 2'],
      endDate: '2024-12-31',
      category: 'Technology',
      allowMultipleVotes: false
    };

    const userId = 'test-user-id';

    it('should create a poll successfully with all required fields', async () => {
      // Mock successful poll creation
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-123' },
              error: null
            })
          })
        })
      };

      // Mock successful options creation
      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable) // polls table
        .mockReturnValueOnce(mockOptionsTable); // options table

      const result = await createPoll(validPollData, userId);

      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-123');
      expect(mockSupabase.from).toHaveBeenCalledWith('polls');
      expect(mockSupabase.from).toHaveBeenCalledWith('options');
      expect(mockPollsTable.insert).toHaveBeenCalledWith({
        title: 'Test Poll',
        description: 'Test Description',
        end_date: '2024-12-31',
        user_id: userId
      });
      expect(mockOptionsTable.insert).toHaveBeenCalledWith([
        { text: 'Option 1', poll_id: 'poll-123' },
        { text: 'Option 2', poll_id: 'poll-123' }
      ]);
      expect(mockRevalidatePath).toHaveBeenCalledWith('/polls');
    });

    it('should create a poll without end date', async () => {
      const pollDataWithoutEndDate = {
        ...validPollData,
        endDate: undefined
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-456' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithoutEndDate, userId);

      expect(result.success).toBe(true);
      expect(mockPollsTable.insert).toHaveBeenCalledWith({
        title: 'Test Poll',
        description: 'Test Description',
        end_date: null,
        user_id: userId
      });
    });

    it('should trim whitespace from title and description', async () => {
      const pollDataWithWhitespace = {
        ...validPollData,
        title: '  Test Poll  ',
        description: '  Test Description  '
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-789' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithWhitespace, userId);

      expect(result.success).toBe(true);
      expect(mockPollsTable.insert).toHaveBeenCalledWith({
        title: 'Test Poll',
        description: 'Test Description',
        end_date: '2024-12-31',
        user_id: userId
      });
    });

    it('should filter out empty options', async () => {
      const pollDataWithEmptyOptions = {
        ...validPollData,
        options: ['Option 1', '', 'Option 2', '   ', 'Option 3']
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-101' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }, { id: 'opt-3' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithEmptyOptions, userId);

      expect(result.success).toBe(true);
      expect(mockOptionsTable.insert).toHaveBeenCalledWith([
        { text: 'Option 1', poll_id: 'poll-101' },
        { text: 'Option 2', poll_id: 'poll-101' },
        { text: 'Option 3', poll_id: 'poll-101' }
      ]);
    });
  });

  describe('Validation Tests', () => {
    const baseValidData = {
      title: 'Test Poll',
      description: 'Test Description',
      options: ['Option 1', 'Option 2'],
      endDate: '2024-12-31',
      category: 'Technology',
      allowMultipleVotes: false
    };

    const userId = 'test-user-id';

    it('should reject poll with empty title', async () => {
      const invalidData = { ...baseValidData, title: '' };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with whitespace-only title', async () => {
      const invalidData = { ...baseValidData, title: '   ' };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with empty description', async () => {
      const invalidData = { ...baseValidData, description: '' };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with whitespace-only description', async () => {
      const invalidData = { ...baseValidData, description: '   ' };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with no options', async () => {
      const invalidData = { ...baseValidData, options: [] };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with only one option', async () => {
      const invalidData = { ...baseValidData, options: ['Option 1'] };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('At least 2 options are required');
    });

    it('should handle poll with only empty options after filtering', async () => {
      const invalidData = { ...baseValidData, options: ['', '   ', ''] };
      
      // This should pass validation since we have 3 options (even if empty)
      // The function will create a poll but with no options since all options are empty
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-123' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-123');
    });

    it('should reject poll with null title', async () => {
      const invalidData = { ...baseValidData, title: null as any };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should reject poll with undefined description', async () => {
      const invalidData = { ...baseValidData, description: undefined as any };
      
      const result = await createPoll(invalidData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });
  });

  describe('Database Error Tests', () => {
    const validPollData = {
      title: 'Test Poll',
      description: 'Test Description',
      options: ['Option 1', 'Option 2'],
      endDate: '2024-12-31',
      category: 'Technology',
      allowMultipleVotes: false
    };

    const userId = 'test-user-id';

    it('should handle poll creation database error', async () => {
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockRejectedValue(new Error('Database connection failed'))
          })
        })
      };

      mockSupabase.from.mockReturnValueOnce(mockPollsTable);

      const result = await createPoll(validPollData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Database connection failed');
    });

    it('should handle options creation database error', async () => {
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-123' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockRejectedValue(new Error('Options table not found'))
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(validPollData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Options table not found');
    });

    it('should handle unexpected database error types', async () => {
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: 'Unexpected error string'
            })
          })
        })
      };

      mockSupabase.from.mockReturnValueOnce(mockPollsTable);

      const result = await createPoll(validPollData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown error');
    });

    it('should handle null error response', async () => {
      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: null
            })
          })
        })
      };

      mockSupabase.from.mockReturnValueOnce(mockPollsTable);

      const result = await createPoll(validPollData, userId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Cannot read properties of null (reading \'id\')');
    });
  });

  describe('Edge Cases', () => {
    const userId = 'test-user-id';

    it('should handle very long title and description', async () => {
      const longTitle = 'A'.repeat(255); // Max VARCHAR length
      const longDescription = 'B'.repeat(1000);
      
      const pollDataWithLongFields = {
        title: longTitle,
        description: longDescription,
        options: ['Option 1', 'Option 2'],
        endDate: '2024-12-31',
        category: 'Technology',
        allowMultipleVotes: false
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-long' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithLongFields, userId);

      expect(result.success).toBe(true);
      expect(mockPollsTable.insert).toHaveBeenCalledWith({
        title: longTitle,
        description: longDescription,
        end_date: '2024-12-31',
        user_id: userId
      });
    });

    it('should handle many options', async () => {
      const manyOptions = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);
      
      const pollDataWithManyOptions = {
        title: 'Test Poll',
        description: 'Test Description',
        options: manyOptions,
        endDate: '2024-12-31',
        category: 'Technology',
        allowMultipleVotes: false
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-many-options' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: manyOptions.map((_, i) => ({ id: `opt-${i + 1}` })),
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithManyOptions, userId);

      expect(result.success).toBe(true);
      expect(mockOptionsTable.insert).toHaveBeenCalledWith(
        manyOptions.map(option => ({ text: option, poll_id: 'poll-many-options' }))
      );
    });

    it('should handle special characters in text fields', async () => {
      const pollDataWithSpecialChars = {
        title: 'Poll with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
        description: 'Description with emojis: 🎉🚀💻 and unicode: ñáéíóú',
        options: ['Option with "quotes"', 'Option with \'apostrophes\'', 'Option with & symbols'],
        endDate: '2024-12-31',
        category: 'Technology',
        allowMultipleVotes: false
      };

      const mockPollsTable = {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { id: 'poll-special' },
              error: null
            })
          })
        })
      };

      const mockOptionsTable = {
        insert: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: [{ id: 'opt-1' }, { id: 'opt-2' }, { id: 'opt-3' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      const result = await createPoll(pollDataWithSpecialChars, userId);

      expect(result.success).toBe(true);
      expect(mockPollsTable.insert).toHaveBeenCalledWith({
        title: 'Poll with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
        description: 'Description with emojis: 🎉🚀💻 and unicode: ñáéíóú',
        end_date: '2024-12-31',
        user_id: userId
      });
    });
  });
});

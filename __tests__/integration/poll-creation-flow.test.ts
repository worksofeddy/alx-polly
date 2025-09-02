import { createPoll } from '@/app/actions/poll-actions';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/lib/supabase/server');
jest.mock('next/cache');

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
const mockRevalidatePath = revalidatePath as jest.MockedFunction<typeof revalidatePath>;

describe('Poll Creation Flow - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Server Action Integration', () => {
    it('should integrate with createPoll server action', async () => {
      // Test that the server action can be imported and called
      expect(createPoll).toBeDefined();
      expect(typeof createPoll).toBe('function');
    });

    it('should handle server action validation', async () => {
      // Test that the server action validates input properly
      const invalidData = {
        title: '',
        description: '',
        options: [],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      const result = await createPoll(invalidData, 'test-user-id');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Title, description, and at least 2 options are required');
    });

    it('should handle server action success with proper mocking', async () => {
      // Test that the server action can process valid data
      const validData = {
        title: 'Test Poll',
        description: 'Test Description',
        options: ['Option 1', 'Option 2'],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock the Supabase client
      const mockSupabase = {
        from: jest.fn()
      };

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
            data: [{ id: 'opt-1' }, { id: 'opt-2' }],
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      // Mock the createClient function
      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(validData, 'test-user-id');
      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-123');
    });

    it('should handle database errors gracefully', async () => {
      // Test that the server action handles database errors properly
      const validData = {
        title: 'Test Poll',
        description: 'Test Description',
        options: ['Option 1', 'Option 2'],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock the Supabase client to throw an error
      const mockSupabase = {
        from: jest.fn().mockReturnValue({
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockRejectedValue(new Error('Database connection failed'))
            })
          })
        })
      };

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(validData, 'test-user-id');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Database connection failed');
    });

    it('should handle options creation errors', async () => {
      // Test that the server action handles options creation errors
      const validData = {
        title: 'Test Poll',
        description: 'Test Description',
        options: ['Option 1', 'Option 2'],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock successful poll creation but failed options creation
      const mockSupabase = {
        from: jest.fn()
      };

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

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(validData, 'test-user-id');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Options table not found');
    });

    it('should handle edge cases with empty options after filtering', async () => {
      // Test that the server action handles edge cases properly
      const edgeCaseData = {
        title: 'Test Poll',
        description: 'Test Description',
        options: ['', '   ', ''], // All empty options
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock successful poll creation but failed options creation due to empty array
      const mockSupabase = {
        from: jest.fn()
      };

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
        insert: jest.fn().mockRejectedValue(new Error('Cannot insert empty options'))
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(edgeCaseData, 'test-user-id');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Cannot insert empty options');
    });

    it('should handle special characters and unicode in text fields', async () => {
      // Test that the server action handles special characters properly
      const specialCharData = {
        title: 'Poll with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
        description: 'Description with emojis: 🎉🚀💻 and unicode: ñáéíóú',
        options: ['Option with "quotes"', 'Option with \'apostrophes\'', 'Option with & symbols'],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock successful creation
      const mockSupabase = {
        from: jest.fn()
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

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(specialCharData, 'test-user-id');
      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-special');
    });

    it('should handle very long text fields', async () => {
      // Test that the server action handles very long text fields
      const longTextData = {
        title: 'A'.repeat(255), // Max VARCHAR length
        description: 'B'.repeat(1000),
        options: ['Option 1', 'Option 2'],
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock successful creation
      const mockSupabase = {
        from: jest.fn()
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

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(longTextData, 'test-user-id');
      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-long');
    });

    it('should handle many options', async () => {
      // Test that the server action handles many options
      const manyOptionsData = {
        title: 'Test Poll',
        description: 'Test Description',
        options: Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`),
        endDate: '',
        category: 'Technology',
        allowMultipleVotes: false
      };

      // Mock successful creation
      const mockSupabase = {
        from: jest.fn()
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
            data: manyOptionsData.options.map((_, i) => ({ id: `opt-${i + 1}` })),
            error: null
          })
        })
      };

      mockSupabase.from
        .mockReturnValueOnce(mockPollsTable)
        .mockReturnValueOnce(mockOptionsTable);

      mockCreateClient.mockReturnValue(mockSupabase);

      const result = await createPoll(manyOptionsData, 'test-user-id');
      expect(result.success).toBe(true);
      expect(result.pollId).toBe('poll-many-options');
    });
  });
});

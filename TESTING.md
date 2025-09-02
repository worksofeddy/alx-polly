# Testing Guide for ALX Polly

This project includes comprehensive testing for both server actions and React components.

## Test Scripts

The following test scripts are available in `package.json`:

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (re-runs on file changes)
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode with coverage

## Test Structure

### Server Actions Tests (`__tests__/actions/poll-actions.test.ts`)

Tests for all poll-related server actions:

- **createPoll**: Tests poll creation with validation, error handling, and database operations
- **updatePoll**: Tests poll updates with ownership verification and option management
- **deletePoll**: Tests poll deletion with authorization checks
- **voteOnPoll**: Tests voting functionality including duplicate vote prevention and poll expiration
- **getPoll**: Tests single poll retrieval with vote counting
- **getPolls**: Tests multiple poll retrieval with filtering

### Component Tests (`__tests__/components/VotingForm.test.tsx`)

Tests for React components:

- **VotingForm**: Tests user interaction, form validation, error handling, and state management

## Test Coverage

The test suite covers:

- ✅ Input validation
- ✅ Database operations
- ✅ Error handling
- ✅ Authorization checks
- ✅ User interactions
- ✅ Component rendering
- ✅ State management
- ✅ Async operations
- ✅ Edge cases

## Running Tests

### Prerequisites

Install dependencies first:

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

The coverage report will show:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### CI Mode

```bash
npm run test:ci
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- Uses Next.js Jest preset
- Configured for TypeScript
- Includes coverage thresholds (80% minimum)
- Tests both `__tests__` directories and `.test.*` files

### Jest Setup (`jest.setup.js`)

- Configures testing environment
- Mocks Next.js router and cache functions
- Sets up global test utilities

## Writing New Tests

### For Server Actions

1. Create test file in `__tests__/actions/`
2. Mock external dependencies (Supabase, Next.js functions)
3. Test success and error scenarios
4. Verify database operations and side effects

### For Components

1. Create test file in `__tests__/components/`
2. Use React Testing Library for rendering and interactions
3. Test user interactions and state changes
4. Mock external dependencies and actions

### Example Test Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '@/path/to/component';

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

## Mocking

### Supabase Client

```typescript
jest.mock('@/lib/supabase/server');
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;
```

### Next.js Functions

```typescript
jest.mock('next/cache');
jest.mock('next/navigation');
```

## Coverage Goals

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Check `jest.config.js` moduleNameMapping
2. **TypeScript errors**: Ensure `@types/jest` is installed
3. **Mock failures**: Verify mock setup in `jest.setup.js`

### Debug Mode

Run tests with verbose output:

```bash
npm test -- --verbose
```

### Single Test File

Run tests for a specific file:

```bash
npm test -- poll-actions.test.ts
```

## Continuous Integration

The test suite is configured for CI environments:

- Uses `--ci` flag for CI-specific behavior
- Generates coverage reports
- Fails on coverage threshold violations
- Runs without watch mode

## Best Practices

1. **Test behavior, not implementation**: Focus on what the code does, not how it does it
2. **Use descriptive test names**: Test names should clearly describe the scenario
3. **Test edge cases**: Include tests for error conditions and boundary values
4. **Keep tests isolated**: Each test should be independent and not rely on others
5. **Mock external dependencies**: Avoid testing external services in unit tests
6. **Use setup and teardown**: Clean up state between tests

# ALX Polly - Polling Application

A modern, full-stack polling application built with Next.js, TypeScript, and Shadcn UI components.

## Features

### 🎯 Core Features
- **User Authentication**: Sign up, sign in, and user management
- **Poll Creation**: Create polls with multiple options, expiration dates, and voting rules
- **Poll Voting**: Vote on polls with real-time results
- **Poll Discovery**: Browse and search through public polls
- **Responsive Design**: Mobile-first design with beautiful UI

### 🔧 Technical Features
- **Next.js 14**: App Router with server-side rendering
- **TypeScript**: Full type safety throughout the application
- **Shadcn UI**: Modern, accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Authentication System**: Custom auth hooks and utilities

## Project Structure

```
alx-polly/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   └── page.tsx             # Sign in/up page
│   ├── polls/                    # Poll-related pages
│   │   ├── page.tsx             # Polls listing
│   │   ├── create/              # Create poll
│   │   │   └── page.tsx
│   │   └── [id]/                # Individual poll view
│   │       └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── src/
│   ├── components/              # React components
│   │   ├── auth/               # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   └── SignUpForm.tsx
│   │   ├── polls/              # Poll-related components
│   │   │   ├── PollCard.tsx
│   │   │   └── CreatePollForm.tsx
│   │   └── ui/                 # UI components (Shadcn)
│   │       ├── Navigation.tsx
│   │       └── [shadcn-components]
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.ts          # Authentication hook
│   ├── lib/                    # Utility libraries
│   │   ├── auth/              # Authentication utilities
│   │   │   └── auth-utils.ts
│   │   └── utils.ts           # General utilities
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── components.json             # Shadcn configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alx-polly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Authentication System
- **useAuth Hook**: Manages authentication state across the app
- **AuthService**: Handles sign in, sign up, and session management
- **SignInForm/SignUpForm**: User-friendly authentication forms

### Poll Management
- **PollCard**: Displays poll information in a grid layout
- **CreatePollForm**: Comprehensive form for creating new polls
- **Poll Voting**: Interactive voting interface with real-time updates

### Navigation
- **Navigation Component**: Responsive navigation with user menu
- **Protected Routes**: Authentication-aware routing

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Poll
```typescript
interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  createdBy: string;
  isActive: boolean;
  isPublic: boolean;
  allowMultipleVotes: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Shadcn UI** for pre-built, accessible components
- **Custom CSS variables** for consistent theming

## Future Enhancements

### Planned Features
- [ ] Real-time voting with WebSockets
- [ ] Poll analytics and charts
- [ ] User profiles and poll history
- [ ] Poll sharing and embedding
- [ ] Advanced poll types (ranked choice, etc.)
- [ ] Email notifications
- [ ] API endpoints for external integrations

### Technical Improvements
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real authentication (NextAuth.js/Auth0)
- [ ] Image upload for user avatars
- [ ] Search and filtering improvements
- [ ] Performance optimizations
- [ ] Unit and integration tests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@alxpolly.com or create an issue in the repository.

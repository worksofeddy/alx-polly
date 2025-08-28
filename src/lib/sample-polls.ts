import { Poll } from "@/types/poll";

export const samplePolls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Vote for your preferred programming language for web development",
    options: [
      { id: "1-1", text: "JavaScript/TypeScript", votes: 45 },
      { id: "1-2", text: "Python", votes: 32 },
      { id: "1-3", text: "Java", votes: 18 },
      { id: "1-4", text: "C++", votes: 12 },
      { id: "1-5", text: "Go", votes: 8 }
    ],
    totalVotes: 115,
    createdAt: "2024-01-15T10:00:00Z",
    expiresAt: "2024-02-15T10:00:00Z",
    isActive: true,
    category: "Technology",
    allowMultipleVotes: false,
    createdBy: "alx_admin"
  },
  {
    id: "2",
    title: "Which framework should we use for the next project?",
    description: "Help us decide on the best framework for our upcoming web application",
    options: [
      { id: "2-1", text: "Next.js", votes: 28 },
      { id: "2-2", text: "React", votes: 22 },
      { id: "2-3", text: "Vue.js", votes: 15 },
      { id: "2-4", text: "Angular", votes: 10 },
      { id: "2-5", text: "Svelte", votes: 8 }
    ],
    totalVotes: 83,
    createdAt: "2024-01-20T14:30:00Z",
    expiresAt: "2024-02-20T14:30:00Z",
    isActive: true,
    category: "Technology",
    allowMultipleVotes: false,
    createdBy: "team_lead"
  },
  {
    id: "3",
    title: "What features should we prioritize?",
    description: "Select the most important features for our MVP (you can choose multiple)",
    options: [
      { id: "3-1", text: "User Authentication", votes: 35 },
      { id: "3-2", text: "Real-time Chat", votes: 28 },
      { id: "3-3", text: "File Upload", votes: 22 },
      { id: "3-4", text: "Push Notifications", votes: 18 },
      { id: "3-5", text: "Analytics Dashboard", votes: 15 },
      { id: "3-6", text: "Mobile App", votes: 12 }
    ],
    totalVotes: 130,
    createdAt: "2024-01-25T09:15:00Z",
    expiresAt: "2024-02-25T09:15:00Z",
    isActive: true,
    category: "Product",
    allowMultipleVotes: true,
    createdBy: "product_manager"
  },
  {
    id: "4",
    title: "What's your preferred coffee?",
    description: "A light-hearted poll about coffee preferences in the office",
    options: [
      { id: "4-1", text: "Espresso", votes: 20 },
      { id: "4-2", text: "Cappuccino", votes: 25 },
      { id: "4-3", text: "Americano", votes: 18 },
      { id: "4-4", text: "Latte", votes: 22 },
      { id: "4-5", text: "I don't drink coffee", votes: 15 }
    ],
    totalVotes: 100,
    createdAt: "2024-01-30T11:45:00Z",
    expiresAt: "2024-02-30T11:45:00Z",
    isActive: true,
    category: "Fun",
    allowMultipleVotes: false,
    createdBy: "coffee_lover"
  },
  {
    id: "5",
    title: "Best team building activity?",
    description: "Vote for your favorite team building activity",
    options: [
      { id: "5-1", text: "Escape Room", votes: 30 },
      { id: "5-2", text: "Cooking Class", votes: 18 },
      { id: "5-3", text: "Outdoor Sports", votes: 25 },
      { id: "5-4", text: "Board Games", votes: 20 },
      { id: "5-5", text: "Volunteer Work", votes: 12 }
    ],
    totalVotes: 105,
    createdAt: "2024-02-01T16:20:00Z",
    expiresAt: "2024-03-01T16:20:00Z",
    isActive: true,
    category: "Team",
    allowMultipleVotes: false,
    createdBy: "hr_manager"
  },
  {
    id: "6",
    title: "Which database should we migrate to?",
    description: "Help us choose the best database for our scalability needs",
    options: [
      { id: "6-1", text: "PostgreSQL", votes: 40 },
      { id: "6-2", text: "MongoDB", votes: 25 },
      { id: "6-3", text: "MySQL", votes: 15 },
      { id: "6-4", text: "Redis", votes: 12 },
      { id: "6-5", text: "Firebase", votes: 8 }
    ],
    totalVotes: 100,
    createdAt: "2024-02-05T13:10:00Z",
    expiresAt: "2024-03-05T13:10:00Z",
    isActive: true,
    category: "Technology",
    allowMultipleVotes: false,
    createdBy: "dev_ops"
  }
];

export const getPollById = (id: string): Poll | undefined => {
  return samplePolls.find(poll => poll.id === id);
};

export const getActivePolls = (): Poll[] => {
  return samplePolls.filter(poll => poll.isActive);
};

export const getPollsByCategory = (category: string): Poll[] => {
  return samplePolls.filter(poll => poll.category === category);
};

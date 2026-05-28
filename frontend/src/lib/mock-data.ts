import { Visibility, QuestStatus } from "./contract-types"

// ─── Mock-data types ─────────────────────────────────────────────────────────
// These mirror the real contract types but use plain `number` for reward
// amounts (the real on-chain types use `bigint`). They exist only to feed
// fixtures during local development.

export interface MockQuestInfo {
  id: number
  owner: string
  name: string
  description: string
  category: string
  tags: string[]
  tokenAddr: string
  createdAt: number
  visibility: Visibility
  status: QuestStatus
  deadline: number
  maxEnrollees?: number
  verified: boolean
}

export interface MockMilestoneInfo {
  id: number
  questId: number
  title: string
  description: string
  rewardAmount: number
}

export interface QuestStats {
  enrolleeCount: number
  milestoneCount: number
  poolBalance: number
}

export interface MilestoneCompletion {
  milestoneId: number
  enrollee: string
  completed: boolean
}

export interface UserStats {
  totalEarned: number
  questsOwned: number
  questsEnrolled: number
  milestonesCompleted: number
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const makeQuest = (
  partial: Pick<MockQuestInfo, "id" | "owner" | "name" | "description" | "createdAt">
): MockQuestInfo => ({
  category: "Programming",
  tags: [],
  tokenAddr: "USDC...STELLAR",
  visibility: Visibility.Public,
  status: QuestStatus.Active,
  deadline: 0,
  verified: false,
  ...partial,
})

export const MOCK_QUESTS: MockQuestInfo[] = [
  makeQuest({
    id: 0,
    owner: "GBXR...K2YQ",
    name: "Learn to Code with Alex",
    description:
      "Teaching my brother the fundamentals of programming. From basic syntax to deploying a real application.",
    createdAt: 1710000000,
  }),
  makeQuest({
    id: 1,
    owner: "GBXR...K2YQ",
    name: "Stellar Development Bootcamp",
    description:
      "A structured path to becoming a Stellar developer. Smart contracts, Soroban, DeFi.",
    createdAt: 1709500000,
  }),
  makeQuest({
    id: 2,
    owner: "GCMN...P8TL",
    name: "Design Fundamentals",
    description: "Learn UI/UX design principles. From Figma basics to shipping a design system.",
    createdAt: 1709800000,
  }),
]

export const MOCK_QUEST_STATS: Record<number, QuestStats> = {
  0: { enrolleeCount: 3, milestoneCount: 5, poolBalance: 2500 },
  1: { enrolleeCount: 8, milestoneCount: 10, poolBalance: 10000 },
  2: { enrolleeCount: 5, milestoneCount: 4, poolBalance: 1200 },
}

export const MOCK_MILESTONES: Record<number, MockMilestoneInfo[]> = {
  0: [
    {
      id: 0,
      questId: 0,
      title: "Hello World",
      description: "Write your first program in any language",
      rewardAmount: 50,
    },
    {
      id: 1,
      questId: 0,
      title: "Build a CLI Tool",
      description: "Create a command-line application that solves a real problem",
      rewardAmount: 100,
    },
    {
      id: 2,
      questId: 0,
      title: "Build your first API",
      description: "Create a REST API with at least 3 endpoints",
      rewardAmount: 150,
    },
    {
      id: 3,
      questId: 0,
      title: "Deploy to Production",
      description: "Deploy your API to a cloud provider",
      rewardAmount: 200,
    },
    {
      id: 4,
      questId: 0,
      title: "Build a Full-Stack App",
      description: "Frontend + backend + database. Ship it.",
      rewardAmount: 500,
    },
  ],
  1: [
    {
      id: 0,
      questId: 1,
      title: "Set up Stellar CLI",
      description: "Install and configure the Stellar development environment",
      rewardAmount: 100,
    },
    {
      id: 1,
      questId: 1,
      title: "First Soroban Contract",
      description: "Write, test, and deploy a hello-world contract",
      rewardAmount: 200,
    },
  ],
}

export const MOCK_COMPLETIONS: Record<number, MilestoneCompletion[]> = {
  0: [
    { milestoneId: 0, enrollee: "GDVW...N5HS", completed: true },
    { milestoneId: 1, enrollee: "GDVW...N5HS", completed: true },
    { milestoneId: 0, enrollee: "GATH...R2BM", completed: true },
  ],
}

export const MOCK_ENROLLEES: Record<number, string[]> = {
  0: ["GDVW...N5HS", "GATH...R2BM", "GCEF...WXYZ"],
  1: ["GDVW...N5HS", "GBYZ...ABCD"],
}

export const MOCK_USER_STATS: UserStats = {
  totalEarned: 750,
  questsOwned: 2,
  questsEnrolled: 1,
  milestonesCompleted: 4,
}

export interface PlatformStats {
  totalQuests: number
  activeUsers: number
  tokensDistributed: number
}

export interface ActivityEvent {
  id: string
  user: string
  action: "enrolled" | "completed" | "created"
  questName: string
  timestamp: number
}

export interface EarningsDataPoint {
  date: string
  amount: number
}

export const MOCK_PLATFORM_STATS: PlatformStats = {
  totalQuests: 156,
  activeUsers: 842,
  tokensDistributed: 125000,
}

// Reuse some existing quests for trending fixtures.
export const MOCK_TRENDING_QUESTS = [MOCK_QUESTS[1], MOCK_QUESTS[0]]

export const MOCK_RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: "act_1",
    user: "GBXR...K2YQ",
    action: "completed",
    questName: "Stellar Development Bootcamp",
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: "act_2",
    user: "GCMN...P8TL",
    action: "enrolled",
    questName: "Design Fundamentals",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: "act_3",
    user: "GDVW...N5HS",
    action: "created",
    questName: "Advanced Rust Patterns",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
  },
]

export const MOCK_EARNINGS_HISTORY: EarningsDataPoint[] = [
  { date: "Jan", amount: 0 },
  { date: "Feb", amount: 150 },
  { date: "Mar", amount: 400 },
  { date: "Apr", amount: 750 },
]

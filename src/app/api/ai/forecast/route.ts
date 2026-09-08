import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface TopicRecommendation {
  topic: string;
  priority: 'High' | 'Medium';
  reason: string;
}

interface TopicSkip {
  topic: string;
  reason: string;
}

interface WeeklyMilestone {
  week: number;
  theme: string;
  goal: string;
}

export interface ForecastPlan {
  recommendedItemsPerDay: number;
  estimatedReadinessScore: number;
  forecastMessage: string;
  companyFocusStrategy: string;
  topicsToFocus: TopicRecommendation[];
  topicsToSkip: TopicSkip[];
  weeklyMilestones: WeeklyMilestone[];
  interviewTips: string[];
}

function buildHeuristicPlan(
  targetCompany: string,
  availableDays: number,
  currentProgress?: { totalCompleted?: number; totalItems?: number; currentVelocity?: number },
  dailyHoursAvailable: number = 2
): ForecastPlan {
  const comp = targetCompany.toLowerCase();
  const days = Math.max(1, availableDays);
  const completed = currentProgress?.totalCompleted || 0;
  const totalItems = currentProgress?.totalItems || 450;
  const itemsLeft = Math.max(1, totalItems - completed);

  // Items per day scaled to realistic limits (max 10-12 / day)
  const rawPacing = itemsLeft / days;
  const recommendedItemsPerDay = Math.min(12, Math.max(2, Math.ceil(rawPacing * (dailyHoursAvailable / 2))));

  // Readiness estimation based on pacing feasibility and current completion
  const completionRatio = Math.min(1, completed / totalItems);
  const readinessBase = Math.round(completionRatio * 60 + Math.min(40, (days / 60) * 40));
  const estimatedReadinessScore = Math.min(95, Math.max(25, readinessBase));

  let companyStrategy = '';
  let topicsToFocus: TopicRecommendation[] = [];
  let topicsToSkip: TopicSkip[] = [];
  let interviewTips: string[] = [];

  if (comp.includes('google')) {
    companyStrategy = "Google heavily tests optimal time & space complexity, non-trivial graph/tree traversals, and dynamic programming. Interviewers value rigorous mathematical correctness, clean code structure, and deep edge-case exploration.";
    topicsToFocus = [
      { topic: 'Dynamic Programming & Memoization', priority: 'High', reason: 'Common in Google onsite loops; test 1D/2D DP and state transitions.' },
      { topic: 'Graph Algorithms (BFS/DFS, Dijkstra, Topological Sort)', priority: 'High', reason: 'High incidence in Google technical screens and domain routing questions.' },
      { topic: 'Binary Search & Monotonic Queues', priority: 'High', reason: 'Frequently used in optimization questions with non-obvious search spaces.' },
      { topic: 'High-Level Distributed Systems', priority: 'Medium', reason: 'Essential for L4/L5+ interviews (caching, sharding, consensus).' }
    ];
    topicsToSkip = [
      { topic: 'Niche Bit Manipulation Tricks', reason: 'Rarely tested in modern Google rounds unless targeting embedded/firmware.' },
      { topic: 'Exotic String Matching (KMP/Rabin-Karp)', reason: 'Standard two-pointer or hash map checks are almost always sufficient.' }
    ];
    interviewTips = [
      'State time and space complexity before typing code.',
      'Clarify all edge cases up front (empty arrays, negative integers, massive inputs).',
      'Actively speak through your thought process and trade-offs.'
    ];
  } else if (comp.includes('meta') || comp.includes('facebook')) {
    companyStrategy = "Meta emphasizes coding velocity, flawless implementation, and algorithmic agility. You are expected to solve 2 medium/hard questions in 45 minutes with minimal hints.";
    topicsToFocus = [
      { topic: 'Binary Trees & BST Traversals', priority: 'High', reason: 'Meta classic for assessing rapid recursion and iterative DFS/BFS.' },
      { topic: 'Two Pointers & Sliding Window', priority: 'High', reason: 'Frequent in first-round technical phone screens.' },
      { topic: 'Top-K Elements & Heaps/Priority Queues', priority: 'High', reason: 'High frequency for stream processing and ranking problems.' },
      { topic: 'High-Level System Design (Feed, Chat)', priority: 'Medium', reason: 'Critical for E5/E6 system design interviews.' }
    ];
    topicsToSkip = [
      { topic: 'Complex Dynamic Programming', reason: 'Meta rarely asks hard DP; focus instead on recursion with basic memoization.' },
      { topic: 'Advanced Segment Trees', reason: 'Overkill for Meta interview scopes.' }
    ];
    interviewTips = [
      'Aim to write syntactically correct code in the first 15-20 minutes per problem.',
      'Dry run your solution with a dry test case before stating you are done.',
      'Be ready to immediately discuss scaling bottlenecks in system design.'
    ];
  } else if (comp.includes('amazon')) {
    companyStrategy = "Amazon looks for solid fundamentals in Trees, Hashing, and Object-Oriented Design (LLD), combined with deep alignment to Leadership Principles (Customer Obsession, Bias for Action, Ownership).";
    topicsToFocus = [
      { topic: 'Trees & BFS/DFS Grid Problems', priority: 'High', reason: 'Zombie in matrix / Number of islands style grid searches are Amazon staples.' },
      { topic: 'Low-Level Design (LLD / OOD)', priority: 'High', reason: 'Expect designing parking lots, locker systems, or shopping carts.' },
      { topic: 'Strings & Hash Tables', priority: 'High', reason: 'High frequency in online assessments (OA) and round 1.' },
      { topic: 'System Design & Scalability', priority: 'Medium', reason: 'Vital for SDE 2 candidates focusing on microservices and DynamoDB.' }
    ];
    topicsToSkip = [
      { topic: 'Hard DP on Trees/Graphs', reason: 'Amazon leans toward practical, readable code over hyper-theoretical DP.' },
      { topic: 'Trie / Advanced Suffix Trees', reason: 'Rarely required; standard Maps and Sets suffice.' }
    ];
    interviewTips = [
      'Prepare 2 strong STAR-format stories for each Amazon Leadership Principle.',
      'Design with clear modularity, clean interfaces, and error handling.',
      'Highlight customer impact and operational excellence.'
    ];
  } else {
    // General FAANG / Tier-1 Tech
    companyStrategy = `Preparation tailored for ${targetCompany}. Focus on core data structures, patterns that generalize across rounds, and clean code communication.`;
    topicsToFocus = [
      { topic: 'Arrays, Two Pointers & Sliding Window', priority: 'High', reason: 'Forms the bedrock of screening rounds across top tech companies.' },
      { topic: 'Trees & Binary Search Trees', priority: 'High', reason: 'Essential benchmark for recursion and tree manipulations.' },
      { topic: 'Graph Traversals (BFS / DFS)', priority: 'High', reason: 'Universal favorite for problem-solving evaluations.' },
      { topic: 'System Design Fundamentals', priority: 'Medium', reason: 'Foundational for mid-level and senior engineering evaluations.' }
    ];
    topicsToSkip = [
      { topic: 'Esoteric Graph Algorithms (Bellman-Ford, Edmonds-Karp)', reason: 'Standard Dijkstra and BFS cover 99% of interview scenarios.' },
      { topic: 'Mathematical Game Theory', reason: 'Low probability of appearing in modern software engineering interviews.' }
    ];
    interviewTips = [
      'Practice explaining your thought process out loud.',
      'Write modular code with sensible variable names.',
      'Always analyze time and space complexity for both brute-force and optimal approaches.'
    ];
  }

  // Generate week-by-week milestones
  const weeksCount = Math.max(1, Math.min(8, Math.ceil(days / 7)));
  const weeklyMilestones: WeeklyMilestone[] = [];
  const themes = [
    'Foundational Patterns (Arrays, Strings, Hash Maps)',
    'Recursion & Tree Traversals (BFS/DFS, BST)',
    'Linear Dynamics & Greedy (Sliding Window, Two Pointers)',
    'Graphs & Shortest Paths (Topological Sort, Dijkstra)',
    'Dynamic Programming & State Machines',
    'Low-Level Design & Clean Architecture',
    'System Design Core (Scalability, Sharding, Caching)',
    'Full Mock Interviews & Speed Drills'
  ];

  for (let w = 1; w <= weeksCount; w++) {
    const themeIndex = (w - 1) % themes.length;
    weeklyMilestones.push({
      week: w,
      theme: themes[themeIndex],
      goal: `Complete ${recommendedItemsPerDay * 6} problems and 1 mock round focusing on ${themes[themeIndex].split(' ')[0]}.`
    });
  }

  return {
    recommendedItemsPerDay,
    estimatedReadinessScore,
    forecastMessage: `Targeting ${targetCompany} in ${days} days: Maintain a steady pace of ${recommendedItemsPerDay} problems/day focusing on high-yield patterns to reach ${estimatedReadinessScore}% exam readiness.`,
    companyFocusStrategy: companyStrategy,
    topicsToFocus,
    topicsToSkip,
    weeklyMilestones,
    interviewTips
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetCompany, availableDays, currentProgress, dailyHoursAvailable } = body;

    if (!targetCompany || !availableDays) {
      return NextResponse.json({ error: 'Missing required forecasting inputs: targetCompany and availableDays' }, { status: 400 });
    }

    const days = Number(availableDays) || 30;
    const hours = Number(dailyHoursAvailable) || 2;

    // If GEMINI_API_KEY is not configured, gracefully fall back to the heuristic plan
    if (!process.env.GEMINI_API_KEY) {
      const fallbackPlan = buildHeuristicPlan(targetCompany, days, currentProgress, hours);
      return NextResponse.json({
        success: true,
        plan: fallbackPlan,
        source: 'heuristic'
      });
    }

    // Call Gemini 2.5 Flash for personalized interview forecasting
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const systemInstruction = `You are a Principal Engineering Director and elite FAANG technical interview coach.
Your job is to analyze the candidate's target company, time window (days remaining), daily study hours, and current progress to generate a precise, realistic, and highly actionable interview preparation forecast and roadmap.
Always return pure, valid JSON with no markdown backticks matching the requested JSON schema:
{
  "recommendedItemsPerDay": number,
  "estimatedReadinessScore": number (0-100),
  "forecastMessage": string,
  "companyFocusStrategy": string (detailed analysis of target company's interview style, common question types, and expectations),
  "topicsToFocus": [
    { "topic": string, "priority": "High" | "Medium", "reason": string }
  ],
  "topicsToSkip": [
    { "topic": string, "reason": string }
  ],
  "weeklyMilestones": [
    { "week": number, "theme": string, "goal": string }
  ],
  "interviewTips": string[] (3-4 bullet points of high-impact advice)
}`;

      const prompt = `
Candidate Profile:
- Target Company: ${targetCompany}
- Time Horizon: ${days} days remaining until target interview date
- Daily Hours Available: ${hours} hours/day
- Current Progress: ${currentProgress ? JSON.stringify(currentProgress) : 'Beginning preparation'}

Generate a structured study roadmap and forecast specifically tailored to crack ${targetCompany} within ${days} days. Be realistic with daily targets and identify which topics to ruthlessly prioritize and which to skip given the time constraint.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const responseText = response.text || '';
      let parsedPlan: ForecastPlan;

      try {
        // Strip markdown backticks if any
        const cleaned = responseText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
        parsedPlan = JSON.parse(cleaned);
      } catch (parseErr) {
        console.warn("JSON parse error from Gemini forecast, using heuristic fallback:", parseErr);
        parsedPlan = buildHeuristicPlan(targetCompany, days, currentProgress, hours);
      }

      // Validate core fields exist
      if (!parsedPlan.recommendedItemsPerDay || !parsedPlan.topicsToFocus) {
        parsedPlan = buildHeuristicPlan(targetCompany, days, currentProgress, hours);
      }

      return NextResponse.json({
        success: true,
        plan: parsedPlan,
        source: 'gemini'
      });
    } catch (aiErr) {
      console.error("Gemini API call failed, falling back to heuristic plan:", aiErr);
      const fallbackPlan = buildHeuristicPlan(targetCompany, days, currentProgress, hours);
      return NextResponse.json({
        success: true,
        plan: fallbackPlan,
        source: 'heuristic'
      });
    }
  } catch (error) {
    console.error("AI Forecast Route Error:", error);
    return NextResponse.json({ error: 'An internal error occurred while processing your request.' }, { status: 500 });
  }
}

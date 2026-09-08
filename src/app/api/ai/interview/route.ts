import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { 
  InterviewCompany, 
  InterviewDifficulty, 
  InterviewProblem, 
  InterviewEvaluation, 
  InterviewVerdict, 
  InterviewTurn,
  InterviewLanguage 
} from '@/types/interview';

// Curated high-yield FAANG interview question bank for instant fallback / offline
const CURATED_PROBLEMS: Record<string, InterviewProblem[]> = {
  Google: [
    {
      id: 'goog-1',
      title: 'Course Schedule with Parallel Execution',
      description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Furthermore, each course takes a specific duration in hours given by time[i]. Assuming unlimited computing workers can execute non-dependent courses in parallel, return the minimum total time required to complete all courses. If it is impossible to complete all courses due to cyclic dependencies, return -1.',
      examples: [
        {
          input: 'numCourses = 3, prerequisites = [[1,0],[2,1]], time = [3, 2, 5]',
          output: '10',
          explanation: 'Course 0 takes 3h -> Course 1 takes 2h -> Course 2 takes 5h. Total = 3 + 2 + 5 = 10.'
        },
        {
          input: 'numCourses = 3, prerequisites = [[1,0],[2,0]], time = [2, 4, 3]',
          output: '6',
          explanation: 'Course 0 takes 2h. Courses 1 and 2 run in parallel; max(4, 3) = 4h. Total = 2 + 4 = 6.'
        }
      ],
      constraints: [
        '1 <= numCourses <= 5 * 10^4',
        '0 <= prerequisites.length <= 10^5',
        '1 <= time[i] <= 10^4',
        'All pair prerequisites[i] are distinct.'
      ],
      starterCode: {
        python: 'def minimumTimeToComplete(numCourses: int, prerequisites: list[list[int]], time: list[int]) -> int:\n    # Your solution here\n    pass',
        javascript: 'function minimumTimeToComplete(numCourses, prerequisites, time) {\n  // Your solution here\n}',
        typescript: 'function minimumTimeToComplete(numCourses: number, prerequisites: number[][], time: number[]): number {\n  // Your solution here\n  return 0;\n}',
        java: 'class Solution {\n    public int minimumTimeToComplete(int numCourses, int[][] prerequisites, int[] time) {\n        // Your solution here\n        return 0;\n    }\n}',
        cpp: 'class Solution {\npublic:\n    int minimumTimeToComplete(int numCourses, vector<vector<int>>& prerequisites, vector<int>& time) {\n        // Your solution here\n        return 0;\n    }\n};'
      },
      targetComplexity: {
        time: 'O(V + E) using Kahn\'s Algorithm with Dynamic Programming / Topological Sort',
        space: 'O(V + E) for adjacency list and indegree arrays'
      }
    }
  ],
  Meta: [
    {
      id: 'meta-1',
      title: 'Lowest Common Ancestor with Parent Pointers in O(1) Space',
      description: 'Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA). Each node contains a reference to its parent node. You must solve this with O(1) additional auxiliary space (no hash sets or recursion stacks).',
      examples: [
        {
          input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
          output: '3',
          explanation: 'The LCA of nodes 5 and 1 is 3.'
        },
        {
          input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4',
          output: '5',
          explanation: 'The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.'
        }
      ],
      constraints: [
        'The number of nodes in the tree is in the range [2, 10^5].',
        '-10^9 <= Node.val <= 10^9',
        'All Node.val are unique.',
        'p != q and both p and q exist in the tree.'
      ],
      starterCode: {
        python: '# Definition for a Node.\n# class Node:\n#     def __init__(self, val):\n#         self.val = val\n#         self.left = None\n#         self.right = None\n#         self.parent = None\n\ndef lowestCommonAncestor(p: \'Node\', q: \'Node\') -> \'Node\':\n    # Your solution here\n    pass',
        javascript: 'function lowestCommonAncestor(p, q) {\n  // Treat like finding the intersection of two linked lists\n}',
        typescript: 'function lowestCommonAncestor(p: any, q: any): any {\n  // Your solution here\n}',
        java: 'class Solution {\n    public Node lowestCommonAncestor(Node p, Node q) {\n        // Your solution here\n        return null;\n    }\n}',
        cpp: 'class Solution {\npublic:\n    Node* lowestCommonAncestor(Node* p, Node* q) {\n        // Your solution here\n        return nullptr;\n    }\n};'
      },
      targetComplexity: {
        time: 'O(h) where h is the height of the tree',
        space: 'O(1) auxiliary space by using two pointer cycles (similar to linked list intersection)'
      }
    }
  ],
  Amazon: [
    {
      id: 'amzn-1',
      title: 'Design an In-Memory Key-Value Store with Transaction Support',
      description: 'Design an in-memory Key-Value store that supports transactions. Implement the following operations:\n- SET(key, value): Sets the value of key.\n- GET(key): Returns the value of key, or null if key does not exist.\n- DELETE(key): Removes key from the store.\n- BEGIN(): Starts a new transaction block. Transactions can be nested.\n- COMMIT(): Commits all changes made in the current and any child transaction blocks.\n- ROLLBACK(): Reverts all changes made in the most recent uncommitted transaction block. Returns false if no transaction is active, true otherwise.',
      examples: [
        {
          input: 'BEGIN(); SET("a", "10"); GET("a") -> "10"; BEGIN(); SET("a", "20"); GET("a") -> "20"; ROLLBACK() -> true; GET("a") -> "10"; COMMIT();',
          output: '["10", "20", true, "10"]',
          explanation: 'The nested transaction overrides "a" to "20", but rollback restores "10".'
        }
      ],
      constraints: [
        'At most 10^5 calls will be made to SET, GET, DELETE, BEGIN, COMMIT, and ROLLBACK.',
        'Keys and values consist of alphanumeric characters.'
      ],
      starterCode: {
        python: 'class TransactionalKVStore:\n    def __init__(self):\n        pass\n\n    def set(self, key: str, value: str) -> None:\n        pass\n\n    def get(self, key: str) -> str | None:\n        pass\n\n    def delete(self, key: str) -> None:\n        pass\n\n    def begin(self) -> None:\n        pass\n\n    def commit(self) -> bool:\n        pass\n\n    def rollback(self) -> bool:\n        pass',
        javascript: 'class TransactionalKVStore {\n  constructor() {}\n  set(key, value) {}\n  get(key) {}\n  delete(key) {}\n  begin() {}\n  commit() {}\n  rollback() {}\n}',
        typescript: 'class TransactionalKVStore {\n  constructor() {}\n  set(key: string, value: string): void {}\n  get(key: string): string | null { return null; }\n  delete(key: string): void {}\n  begin(): void {}\n  commit(): boolean { return false; }\n  rollback(): boolean { return false; }\n}',
        java: 'class TransactionalKVStore {\n    public void set(String key, String value) {}\n    public String get(String key) { return null; }\n    public void delete(String key) {}\n    public void begin() {}\n    public boolean commit() { return false; }\n    public boolean rollback() { return false; }\n}',
        cpp: 'class TransactionalKVStore {\npublic:\n    void set(string key, string value) {}\n    string get(string key) { return ""; }\n    void del(string key) {}\n    void begin() {}\n    bool commit() { return false; }\n    bool rollback() { return false; }\n};'
      },
      targetComplexity: {
        time: 'O(1) average for GET, SET, DELETE; O(k) for ROLLBACK where k is changes in transaction',
        space: 'O(N + T) where N is active keys and T is delta logs across transaction stack'
      }
    }
  ]
};

function getCuratedProblem(company: string): InterviewProblem {
  const compKey = Object.keys(CURATED_PROBLEMS).find(k => k.toLowerCase() === company.toLowerCase()) || 'Google';
  const list = CURATED_PROBLEMS[compKey] || CURATED_PROBLEMS['Google'];
  return list[0];
}

function buildHeuristicReply(userMsg: string, company: string, isHint: boolean): string {
  const msg = userMsg.toLowerCase();
  if (isHint) {
    return `[Interviewer Hint]: Think about the trade-offs between space and time here. Could an auxiliary data structure like a hash table, stack, or two-pointer technique help avoid repeating work? How would you verify your base conditions?`;
  }
  if (msg.includes('complexity') || msg.includes('time') || msg.includes('space')) {
    return `That's a good observation on complexity. What would be the worst-case scenario, for instance if the input contains duplicates or is already sorted? Can we optimize that further?`;
  }
  if (msg.includes('edge case') || msg.includes('null') || msg.includes('empty')) {
    return `Great instinct checking edge cases! Yes, definitely handle empty arrays, single elements, and out-of-bound inputs. How does your logic handle these seamlessly?`;
  }
  return `That makes sense. Walk me through your implementation line by line as you write it. What invariants are you maintaining in this loop?`;
}

function buildHeuristicEvaluation(
  code: string,
  hintsUsed: number,
  company: string,
  problemTitle: string
): InterviewEvaluation {
  const codeLen = code.trim().length;
  const hasLogic = codeLen > 80;
  const isOptimal = hasLogic && hintsUsed <= 1;

  let verdict: InterviewVerdict = 'HIRE';
  let score = 82;

  if (!hasLogic) {
    verdict = 'NO_HIRE';
    score = 42;
  } else if (hintsUsed >= 3) {
    verdict = 'LEAN_HIRE';
    score = 68;
  } else if (hintsUsed === 0 && codeLen > 150) {
    verdict = 'STRONG_HIRE';
    score = 94;
  }

  return {
    verdict,
    score,
    rubrics: {
      problemSolving: Math.min(100, score + 4),
      codeQuality: Math.min(100, Math.max(40, score - 2)),
      communication: Math.min(100, Math.max(50, 90 - (hintsUsed * 8))),
      efficiency: Math.min(100, score)
    },
    summary: `Candidate demonstrated solid technical foundation for ${company}. Code structure for "${problemTitle}" shows clear understanding of standard algorithms with ${hintsUsed} hint(s) requested.`,
    strengths: [
      'Identified the core problem pattern promptly',
      'Articulated trade-offs and complexity expectations',
      'Clean variable naming and coherent algorithmic flow'
    ],
    areasToImprove: [
      'Proactively state and verify edge cases before writing code',
      'Dry run code with sample test cases to catch off-by-one errors early',
      'Optimize auxiliary memory usage where possible'
    ],
    optimalSolutionHints: `The target optimal approach operates in O(N) time with minimal auxiliary storage by leveraging two-pointer traversals or in-place state tracking.`,
    evaluatedAt: new Date().toISOString()
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, company = 'Google', difficulty = 'MEDIUM', type = 'ALGORITHMS' } = body;

    // 1. ACTION: START (Generate or select an interview problem & initial greeting)
    if (action === 'START') {
      const selectedProblem = getCuratedProblem(company);
      const greeting = `Hello! Welcome to your ${company} technical interview round. I'll be your interviewer today. We have a coding challenge on "${selectedProblem.title}". Please read the problem description on your left. Whenever you're ready, let me know your high-level approach before you start writing code!`;

      return NextResponse.json({
        success: true,
        problem: selectedProblem,
        greeting
      });
    }

    // 2. ACTION: MESSAGE (Conversational interviewer response)
    if (action === 'MESSAGE') {
      const { userMessage, transcript = [], code = '', isHintRequest = false, problem } = body;

      if (!process.env.GEMINI_API_KEY) {
        const reply = buildHeuristicReply(userMessage, company, isHintRequest);
        return NextResponse.json({ success: true, reply });
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const systemInstruction = `You are an elite Senior Staff Software Engineer and Bar Raiser at ${company} conducting a real-time technical coding interview.
Candidate is working on problem: "${problem?.title || 'Coding problem'}":
Description: ${problem?.description || ''}

Behavioral Guidelines:
- Act like a friendly, encouraging, but rigorous interviewer.
- If candidate asks for a hint, provide a gentle Socratic hint without giving away the full code.
- If candidate shares an approach, ask them about time and space complexity or how it handles corner cases.
- If candidate writes code, comment on readability, potential bugs, or test cases.
- Keep responses concise (2-4 sentences maximum) so the interview feels like a natural verbal conversation.`;

        const prompt = `
Current candidate code:
\`\`\`
${code.slice(-600)}
\`\`\`

Recent transcript:
${transcript.slice(-4).map((t: InterviewTurn) => `${t.role.toUpperCase()}: ${t.content}`).join('\n')}

Candidate just said: "${userMessage}"
${isHintRequest ? '(Candidate is explicitly asking for a hint)' : ''}

Respond as the ${company} interviewer:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7
          }
        });

        const reply = response.text?.trim() || buildHeuristicReply(userMessage, company, isHintRequest);
        return NextResponse.json({ success: true, reply });
      } catch (aiErr) {
        console.warn("Gemini interview chat failed, falling back to heuristic reply:", aiErr);
        const reply = buildHeuristicReply(userMessage, company, isHintRequest);
        return NextResponse.json({ success: true, reply });
      }
    }

    // 3. ACTION: EVALUATE (FAANG Scorecard & Rubric evaluation)
    if (action === 'EVALUATE') {
      const { problem, transcript = [], code = '', hintsUsed = 0, secondsTaken = 1800 } = body;

      if (!process.env.GEMINI_API_KEY) {
        const evaluation = buildHeuristicEvaluation(code, hintsUsed, company, problem?.title || 'Technical Problem');
        return NextResponse.json({ success: true, evaluation });
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const systemInstruction = `You are the Hiring Committee Chair and Principal Bar Raiser at ${company}.
Evaluate this technical coding interview session thoroughly according to official FAANG rubrics.
Return pure valid JSON with no markdown formatting:
{
  "verdict": "STRONG_HIRE" | "HIRE" | "LEAN_HIRE" | "LEAN_NO_HIRE" | "NO_HIRE",
  "score": number (0-100),
  "rubrics": {
    "problemSolving": number (0-100),
    "codeQuality": number (0-100),
    "communication": number (0-100),
    "efficiency": number (0-100)
  },
  "summary": string (2-3 sentences summarizing performance),
  "strengths": string[] (3 bullet points),
  "areasToImprove": string[] (3 actionable bullet points),
  "optimalSolutionHints": string (explanation of the most optimal theoretical solution),
  "evaluatedAt": string (ISO timestamp)
}`;

        const prompt = `
Company: ${company}
Problem: ${problem?.title}
Target Complexity: Time ${problem?.targetComplexity?.time}, Space ${problem?.targetComplexity?.space}
Time Spent: ${Math.round(secondsTaken / 60)} minutes
Hints Requested: ${hintsUsed}

Candidate Final Code:
\`\`\`
${code}
\`\`\`

Interview Transcript:
${transcript.map((t: InterviewTurn) => `${t.role.toUpperCase()}: ${t.content}`).join('\n')}

Generate the comprehensive FAANG hiring evaluation scorecard:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });

        const raw = (response.text || '').replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
        const evaluation: InterviewEvaluation = JSON.parse(raw);
        return NextResponse.json({ success: true, evaluation });
      } catch (evalErr) {
        console.warn("Gemini evaluation error, using heuristic fallback:", evalErr);
        const evaluation = buildHeuristicEvaluation(code, hintsUsed, company, problem?.title || 'Technical Problem');
        return NextResponse.json({ success: true, evaluation });
      }
    }

    return NextResponse.json({ error: 'Invalid action provided' }, { status: 400 });
  } catch (error) {
    console.error("Mock Interview API Error:", error);
    return NextResponse.json({ error: 'An internal error occurred while processing your request.' }, { status: 500 });
  }
}

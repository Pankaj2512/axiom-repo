import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';

// Import datasets
import { tracks } from '@/data/tracks';
import { Item } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GoogleGenAI } from '@google/genai';

// Helper to find an item across all tracks
function findItemById(itemId: string): Item | null {
  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const topic of mod.topics) {
        const item = topic.items.find(i => i.id === itemId);
        if (item) return item;
      }
    }
  }
  return null;
}

// Transform GitHub web URL to Raw URL
function getRawGithubUrl(url: string): string | null {
  if (!url) return null;
  const githubRegex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/;
  const match = url.match(githubRegex);
  
  if (match) {
    const [, owner, repo, branch, filepath] = match;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filepath}`;
  }
  
  return null;
}

// AI Content Generator with File-System Cache
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

async function getOrGenerateAiContent(item: Item): Promise<string | null> {
  if (!ai || item.type !== 'QUESTION') return null;

  const cacheDir = path.join(process.cwd(), 'src/data/cache');
  const cachePath = path.join(cacheDir, `${item.id}.md`);

  // 1. Check local cache
  try {
    if (fs.existsSync(cachePath)) {
      return await fs.promises.readFile(cachePath, 'utf-8');
    }
  } catch (e) {
    console.warn("Cache read error", e);
  }

  // 2. Generate with Gemini
  try {
    const prompt = `You are an expert DSA instructor. I need a comprehensive problem description for a coding problem titled "${item.title}".
    
Please output strictly in Markdown format. The output MUST include:
1. **Problem Statement:** A clear, unambiguous description of the problem.
2. **Examples:** 3 to 4 comprehensive test cases/examples. For each example, provide the Input, Output, and a brief Explanation.
3. **Constraints:** Realistic constraints for the problem (e.g., time complexity, array sizes).

Do NOT provide the solution code. Just the problem description and test cases.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const generatedText = response.text || '';

    // 3. Save to cache asynchronously so it doesn't block
    if (generatedText) {
      fs.promises.mkdir(cacheDir, { recursive: true })
        .then(() => fs.promises.writeFile(cachePath, generatedText, 'utf-8'))
        .catch(e => console.error("Cache write error", e));
    }

    return generatedText;
  } catch (e) {
    console.error("Gemini generation failed", e);
    return null;
  }
}

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const item = findItemById(itemId);

  if (!item) {
    notFound();
  }

  let markdownContent = null;
  let fetchError = null;
  let isAiGenerated = false;
  const rawUrl = item.externalUrl ? getRawGithubUrl(item.externalUrl) : null;

  // If it's a GitHub link, fetch from GitHub.
  if (rawUrl) {
    try {
      const res = await fetch(rawUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        markdownContent = await res.text();
      } else {
        fetchError = `Failed to fetch content from GitHub (Status: ${res.status})`;
      }
    } catch (err) {
      fetchError = 'Network error while fetching content.';
    }
  } 
  // If it's NOT a GitHub link but it is a Question (like DSA), generate via AI
  else if (item.type === 'QUESTION') {
    const aiContent = await getOrGenerateAiContent(item);
    if (aiContent) {
      markdownContent = aiContent;
      isAiGenerated = true;
    }
  }

  const difficultyVariant = item.difficulty?.toLowerCase() as any;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      <div className="mb-6">
        <Link 
          href="/syllabus" 
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Syllabus
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="info" className="uppercase tracking-wider">{item.type.replace('_', ' ')}</Badge>
          {item.difficulty && (
            <Badge variant={difficultyVariant || 'default'}>{item.difficulty}</Badge>
          )}
          {isAiGenerated && (
            <Badge variant="warning" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              <Sparkles className="w-3 h-3" />
              AI Generated
            </Badge>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>
        
        {item.externalUrl && (
          <div className="flex gap-4">
            <a 
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {rawUrl ? 'View on GitHub' : 'Solve Externally'}
            </a>
          </div>
        )}
      </div>

      <Card className="p-8 min-h-[500px]">
        {markdownContent ? (
          <div className="prose prose-invert prose-slate max-w-none prose-pre:bg-[var(--bg-primary)] prose-pre:border prose-pre:border-[var(--border)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-secondary)] py-20">
            <p className="mb-4 text-[var(--error)]">{fetchError}</p>
            <p>Please use the button above to view the content directly on GitHub.</p>
          </div>
        ) : item.externalUrl ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-secondary)] py-20">
            <p className="mb-4">This content is hosted externally and cannot be rendered directly in the app.</p>
            <a 
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white transition-colors font-medium"
            >
              Open External Resource
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-secondary)] py-20">
            <p>No detailed content available for this item yet.</p>
          </div>
        )}
      </Card>
    </div>
  );
}

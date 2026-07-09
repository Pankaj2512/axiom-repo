import { Track } from '@/types';
import { dsaStriver450Topics } from './dsa-striver450';
import { hldTopics } from './hld-topics';
import { lldTopics } from './lld-problems';
import { csFundamentalsTopics } from './cs-fundamentals';

export const tracks: Track[] = [
  {
    id: 'sde2',
    name: 'SDE 2 Preparation',
    description: 'Comprehensive track for cracking SDE 2 roles at top-tier companies.',
    icon: 'Code2',
    category: 'ENGINEERING',
    modules: [
      {
        id: 'mod-dsa',
        trackId: 'sde2',
        name: 'Data Structures & Algorithms',
        description: 'Advanced DSA and problem-solving patterns.',
        order: 1,
        topics: dsaStriver450Topics
      },
      {
        id: 'mod-hld',
        trackId: 'sde2',
        name: 'High-Level Design (HLD)',
        description: 'Scalable system architecture and real-world case studies.',
        order: 2,
        topics: hldTopics
      },
      {
        id: 'mod-lld',
        trackId: 'sde2',
        name: 'Low-Level Design (LLD)',
        description: 'Object-Oriented Design, SOLID principles, and Design Patterns.',
        order: 3,
        topics: lldTopics
      }
    ]
  },
  {
    id: 'aiml',
    name: 'AI/ML Senior Engineer',
    description: 'Track for transitioning to or cracking Senior AI/ML roles.',
    icon: 'Brain',
    category: 'ENGINEERING',
    modules: [
      {
        id: 'mod-ml-fundamentals',
        trackId: 'aiml',
        name: 'ML Fundamentals',
        description: 'Core machine learning concepts and math.',
        order: 1,
        topics: []
      },
      {
        id: 'mod-dl',
        trackId: 'aiml',
        name: 'Deep Learning',
        description: 'Neural networks, CNNs, RNNs, and optimization.',
        order: 2,
        topics: []
      },
      {
        id: 'mod-ml-system-design',
        trackId: 'aiml',
        name: 'ML System Design',
        description: 'Designing end-to-end ML pipelines and infrastructure.',
        order: 3,
        topics: []
      },
      {
        id: 'mod-genai',
        trackId: 'aiml',
        name: 'GenAI & LLMs',
        description: 'Transformers, fine-tuning, RAG, and deployment.',
        order: 4,
        topics: []
      }
    ]
  },
  {
    id: 'fresher',
    name: 'Fresher SDE',
    description: 'Foundational track for new grads targeting entry-level roles.',
    icon: 'GraduationCap',
    category: 'ENGINEERING',
    modules: [
      {
        id: 'mod-dsa-basics',
        trackId: 'fresher',
        name: 'DSA Basics',
        description: 'Core data structures and common algorithms.',
        order: 1,
        topics: []
      },
      {
        id: 'mod-cs-fundamentals',
        trackId: 'fresher',
        name: 'CS Fundamentals',
        description: 'OS, OOP, Computer Networks, and DBMS.',
        order: 2,
        topics: csFundamentalsTopics
      }
    ]
  }
];


// Pre-computed counts for performance
export const TOTAL_ITEMS_COUNT = tracks.reduce((sum, track) =>
  sum + track.modules.reduce((mSum, mod) =>
    mSum + mod.topics.reduce((tSum, topic) => tSum + topic.items.length, 0)
  , 0)
, 0);

export const TRACK_ITEMS_COUNT = tracks.reduce((acc, track) => {
  acc[track.id] = track.modules.reduce((mSum, mod) =>
    mSum + mod.topics.reduce((tSum, topic) => tSum + topic.items.length, 0)
  , 0);
  return acc;
}, {} as Record<string, number>);

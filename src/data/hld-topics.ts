import { Topic } from '@/types';

export const hldTopics: Topic[] = [
  {
    id: 'topic-hld-concepts',
    moduleId: 'mod-hld',
    name: 'Core Concepts',
    description: 'Fundamental concepts of distributed systems and architecture.',
    order: 1,
    items: [
      { id: 'hld-conc-1', topicId: 'topic-hld-concepts', title: 'Scalability (Horizontal vs Vertical)', type: 'CONCEPT', order: 1 },
      { id: 'hld-conc-2', topicId: 'topic-hld-concepts', title: 'Load Balancing', type: 'CONCEPT', order: 2 },
      { id: 'hld-conc-3', topicId: 'topic-hld-concepts', title: 'Caching & Content Delivery Networks (CDN)', type: 'CONCEPT', order: 3 },
      { id: 'hld-conc-4', topicId: 'topic-hld-concepts', title: 'Database Sharding & Partitioning', type: 'CONCEPT', order: 4 },
      { id: 'hld-conc-5', topicId: 'topic-hld-concepts', title: 'Database Replication', type: 'CONCEPT', order: 5 },
      { id: 'hld-conc-6', topicId: 'topic-hld-concepts', title: 'SQL vs NoSQL', type: 'CONCEPT', order: 6 },
      { id: 'hld-conc-7', topicId: 'topic-hld-concepts', title: 'CAP Theorem & PACELC', type: 'CONCEPT', order: 7 },
      { id: 'hld-conc-8', topicId: 'topic-hld-concepts', title: 'Consistent Hashing', type: 'CONCEPT', order: 8 },
      { id: 'hld-conc-9', topicId: 'topic-hld-concepts', title: 'Message Queues & Pub/Sub', type: 'CONCEPT', order: 9 },
      { id: 'hld-conc-10', topicId: 'topic-hld-concepts', title: 'Microservices vs Monolithic Architecture', type: 'CONCEPT', order: 10 },
      { id: 'hld-conc-11', topicId: 'topic-hld-concepts', title: 'API Gateway', type: 'CONCEPT', order: 11 },
      { id: 'hld-conc-12', topicId: 'topic-hld-concepts', title: 'Rate Limiting', type: 'CONCEPT', order: 12 },
    ]
  },
  {
    id: 'topic-hld-cases',
    moduleId: 'mod-hld',
    name: 'Case Studies',
    description: 'System design interviews for popular platforms.',
    order: 2,
    items: [
      { id: 'hld-case-1', topicId: 'topic-hld-cases', title: 'Design a URL Shortener (TinyURL)', difficulty: 'EASY', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 1 },
      { id: 'hld-case-2', topicId: 'topic-hld-cases', title: 'Design Pastebin', difficulty: 'EASY', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 2 },
      { id: 'hld-case-3', topicId: 'topic-hld-cases', title: 'Design Twitter (Timeline & Search)', difficulty: 'MEDIUM', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 3 },
      { id: 'hld-case-4', topicId: 'topic-hld-cases', title: 'Design Instagram (Photo Sharing)', difficulty: 'MEDIUM', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 4 },
      { id: 'hld-case-5', topicId: 'topic-hld-cases', title: 'Design a Web Crawler', difficulty: 'MEDIUM', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 5 },
      { id: 'hld-case-6', topicId: 'topic-hld-cases', title: 'Design a Chat System (WhatsApp)', difficulty: 'HARD', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 6 },
      { id: 'hld-case-7', topicId: 'topic-hld-cases', title: 'Design a Video Streaming Service (YouTube/Netflix)', difficulty: 'HARD', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 7 },
      { id: 'hld-case-8', topicId: 'topic-hld-cases', title: 'Design a File Storage Service (Dropbox/Google Drive)', difficulty: 'HARD', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 8 },
      { id: 'hld-case-9', topicId: 'topic-hld-cases', title: 'Design a Ride Sharing Service (Uber/Lyft)', difficulty: 'HARD', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 9 },
      { id: 'hld-case-10', topicId: 'topic-hld-cases', title: 'Design a Notification System', difficulty: 'MEDIUM', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 10 },
      { id: 'hld-case-11', topicId: 'topic-hld-cases', title: 'Design a Search Engine (Google)', difficulty: 'HARD', type: 'CASE_STUDY', externalUrl: 'https://github.com/donnemartin/system-design-primer', order: 11 },
    ]
  }
];

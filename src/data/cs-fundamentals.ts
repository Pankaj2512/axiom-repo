import { Topic } from '@/types';

export const csFundamentalsTopics: Topic[] = [
  {
    id: 'topic-os',
    moduleId: 'mod-cs-fundamentals',
    name: 'Operating Systems',
    description: 'Core concepts of how operating systems work.',
    order: 1,
    items: [
      { id: 'cs-os-1', topicId: 'topic-os', title: 'Process Management & Process Control Block (PCB)', type: 'CONCEPT', order: 1 },
      { id: 'cs-os-2', topicId: 'topic-os', title: 'Threads & Concurrency', type: 'CONCEPT', order: 2 },
      { id: 'cs-os-3', topicId: 'topic-os', title: 'CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)', type: 'CONCEPT', order: 3 },
      { id: 'cs-os-4', topicId: 'topic-os', title: 'Deadlocks (Conditions, Prevention, Banker\'s Algorithm)', type: 'CONCEPT', order: 4 },
      { id: 'cs-os-5', topicId: 'topic-os', title: 'Memory Management (Paging, Segmentation)', type: 'CONCEPT', order: 5 },
      { id: 'cs-os-6', topicId: 'topic-os', title: 'Virtual Memory & Page Replacement Algorithms', type: 'CONCEPT', order: 6 },
      { id: 'cs-os-7', topicId: 'topic-os', title: 'File Systems & Storage Management', type: 'CONCEPT', order: 7 },
      { id: 'cs-os-8', topicId: 'topic-os', title: 'System Calls (fork, exec, wait)', type: 'CONCEPT', order: 8 },
    ]
  },
  {
    id: 'topic-oop-fresh',
    moduleId: 'mod-cs-fundamentals',
    name: 'Object-Oriented Programming',
    description: 'Fundamentals of OOP concepts and principles.',
    order: 2,
    items: [
      { id: 'cs-oop-1', topicId: 'topic-oop-fresh', title: 'Four Pillars of OOP', type: 'CONCEPT', order: 1 },
      { id: 'cs-oop-2', topicId: 'topic-oop-fresh', title: 'Access Modifiers & Encapsulation', type: 'CONCEPT', order: 2 },
      { id: 'cs-oop-3', topicId: 'topic-oop-fresh', title: 'Abstract Class vs Interface', type: 'CONCEPT', order: 3 },
      { id: 'cs-oop-4', topicId: 'topic-oop-fresh', title: 'Composition vs Inheritance', type: 'CONCEPT', order: 4 },
      { id: 'cs-oop-5', topicId: 'topic-oop-fresh', title: 'Static vs Dynamic Binding (Overloading vs Overriding)', type: 'CONCEPT', order: 5 },
    ]
  },
  {
    id: 'topic-networks',
    moduleId: 'mod-cs-fundamentals',
    name: 'Computer Networks',
    description: 'Networking fundamentals and protocols.',
    order: 3,
    items: [
      { id: 'cs-net-1', topicId: 'topic-networks', title: 'OSI Model (7 Layers)', type: 'CONCEPT', order: 1 },
      { id: 'cs-net-2', topicId: 'topic-networks', title: 'TCP/IP Model', type: 'CONCEPT', order: 2 },
      { id: 'cs-net-3', topicId: 'topic-networks', title: 'HTTP vs HTTPS', type: 'CONCEPT', order: 3 },
      { id: 'cs-net-4', topicId: 'topic-networks', title: 'DNS Resolution Process', type: 'CONCEPT', order: 4 },
      { id: 'cs-net-5', topicId: 'topic-networks', title: 'IP Addressing & Subnetting', type: 'CONCEPT', order: 5 },
      { id: 'cs-net-6', topicId: 'topic-networks', title: 'TCP vs UDP', type: 'CONCEPT', order: 6 },
      { id: 'cs-net-7', topicId: 'topic-networks', title: 'Load Balancers (Layer 4 vs Layer 7)', type: 'CONCEPT', order: 7 },
      { id: 'cs-net-8', topicId: 'topic-networks', title: 'WebSockets vs Polling', type: 'CONCEPT', order: 8 },
      { id: 'cs-net-9', topicId: 'topic-networks', title: 'REST vs GraphQL vs gRPC', type: 'CONCEPT', order: 9 },
    ]
  },
  {
    id: 'topic-dbms',
    moduleId: 'mod-cs-fundamentals',
    name: 'Database Management Systems',
    description: 'Relational database concepts and SQL.',
    order: 4,
    items: [
      { id: 'cs-dbms-1', topicId: 'topic-dbms', title: 'Database Normalization (1NF to BCNF)', type: 'CONCEPT', order: 1 },
      { id: 'cs-dbms-2', topicId: 'topic-dbms', title: 'SQL Joins (Inner, Left, Right, Full)', type: 'CONCEPT', order: 2 },
      { id: 'cs-dbms-3', topicId: 'topic-dbms', title: 'Indexing (B-Trees, Hash Indexes)', type: 'CONCEPT', order: 3 },
      { id: 'cs-dbms-4', topicId: 'topic-dbms', title: 'Transactions & Concurrency Control', type: 'CONCEPT', order: 4 },
      { id: 'cs-dbms-5', topicId: 'topic-dbms', title: 'ACID Properties', type: 'CONCEPT', order: 5 },
      { id: 'cs-dbms-6', topicId: 'topic-dbms', title: 'CAP Theorem', type: 'CONCEPT', order: 6 },
      { id: 'cs-dbms-7', topicId: 'topic-dbms', title: 'Types of NoSQL Databases (Document, Key-Value, Graph, Column)', type: 'CONCEPT', order: 7 },
    ]
  }
];

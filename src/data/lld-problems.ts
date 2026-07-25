import { Topic } from '@/types';

export const lldTopics: Topic[] = [
  {
    id: 'topic-oop',
    moduleId: 'mod-lld',
    name: 'OOP Fundamentals',
    description: 'Core concepts of Object-Oriented Programming.',
    order: 1,
    items: [
      { id: 'lld-oop-1', topicId: 'topic-oop', title: 'Encapsulation', type: 'CONCEPT', order: 1 },
      { id: 'lld-oop-2', topicId: 'topic-oop', title: 'Abstraction', type: 'CONCEPT', order: 2 },
      { id: 'lld-oop-3', topicId: 'topic-oop', title: 'Inheritance', type: 'CONCEPT', order: 3 },
      { id: 'lld-oop-4', topicId: 'topic-oop', title: 'Polymorphism', type: 'CONCEPT', order: 4 },
    ]
  },
  {
    id: 'topic-solid',
    moduleId: 'mod-lld',
    name: 'SOLID Principles',
    description: 'Five principles of object-oriented class design.',
    order: 2,
    items: [
      { id: 'lld-solid-1', topicId: 'topic-solid', title: 'Single Responsibility Principle (SRP)', type: 'CONCEPT', order: 1 },
      { id: 'lld-solid-2', topicId: 'topic-solid', title: 'Open/Closed Principle (OCP)', type: 'CONCEPT', order: 2 },
      { id: 'lld-solid-3', topicId: 'topic-solid', title: 'Liskov Substitution Principle (LSP)', type: 'CONCEPT', order: 3 },
      { id: 'lld-solid-4', topicId: 'topic-solid', title: 'Interface Segregation Principle (ISP)', type: 'CONCEPT', order: 4 },
      { id: 'lld-solid-5', topicId: 'topic-solid', title: 'Dependency Inversion Principle (DIP)', type: 'CONCEPT', order: 5 },
    ]
  },
  {
    id: 'topic-design-patterns',
    moduleId: 'mod-lld',
    name: 'Design Patterns',
    description: 'Commonly used GoF design patterns.',
    order: 3,
    items: [
      { id: 'lld-dp-1', topicId: 'topic-design-patterns', title: 'Singleton Pattern', type: 'CONCEPT', order: 1 },
      { id: 'lld-dp-2', topicId: 'topic-design-patterns', title: 'Factory Method Pattern', type: 'CONCEPT', order: 2 },
      { id: 'lld-dp-3', topicId: 'topic-design-patterns', title: 'Abstract Factory Pattern', type: 'CONCEPT', order: 3 },
      { id: 'lld-dp-4', topicId: 'topic-design-patterns', title: 'Builder Pattern', type: 'CONCEPT', order: 4 },
      { id: 'lld-dp-5', topicId: 'topic-design-patterns', title: 'Observer Pattern', type: 'CONCEPT', order: 5 },
      { id: 'lld-dp-6', topicId: 'topic-design-patterns', title: 'Strategy Pattern', type: 'CONCEPT', order: 6 },
      { id: 'lld-dp-7', topicId: 'topic-design-patterns', title: 'Decorator Pattern', type: 'CONCEPT', order: 7 },
      { id: 'lld-dp-8', topicId: 'topic-design-patterns', title: 'Adapter Pattern', type: 'CONCEPT', order: 8 },
      { id: 'lld-dp-9', topicId: 'topic-design-patterns', title: 'Facade Pattern', type: 'CONCEPT', order: 9 },
      { id: 'lld-dp-10', topicId: 'topic-design-patterns', title: 'Command Pattern', type: 'CONCEPT', order: 10 },
    ]
  },
  {
    id: 'topic-lld-practice',
    moduleId: 'mod-lld',
    name: 'Practice Problems',
    description: 'Classic Low-Level Design interview problems.',
    order: 4,
    items: [
      { id: 'lld-prac-1', topicId: 'topic-lld-practice', title: 'Design a Parking Lot', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/parking-lot.md', order: 1 },
      { id: 'lld-prac-2', topicId: 'topic-lld-practice', title: 'Design an Elevator System', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/elevator-system.md', order: 2 },
      { id: 'lld-prac-3', topicId: 'topic-lld-practice', title: 'Design a Library Management System', difficulty: 'MEDIUM', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/library-management-system.md', order: 3 },
      { id: 'lld-prac-4', topicId: 'topic-lld-practice', title: 'Design a Vending Machine', difficulty: 'MEDIUM', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/vending-machine.md', order: 4 },
      { id: 'lld-prac-5', topicId: 'topic-lld-practice', title: 'Design Amazon (Online Shopping)', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/amazon.md', order: 5 },
      { id: 'lld-prac-6', topicId: 'topic-lld-practice', title: 'Design Swiggy / Zomato (Food Delivery)', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/restaurant-management-system.md', order: 6 },
      { id: 'lld-prac-7', topicId: 'topic-lld-practice', title: 'Design BookMyShow (Movie Booking)', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/concert-ticket-booking-system.md', order: 7 },
      { id: 'lld-prac-8', topicId: 'topic-lld-practice', title: 'Design Chess Game', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/chess.md', order: 8 },
      { id: 'lld-prac-9', topicId: 'topic-lld-practice', title: 'Design Tic-Tac-Toe Game', difficulty: 'EASY', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/tic-tac-toe.md', order: 9 },
      { id: 'lld-prac-10', topicId: 'topic-lld-practice', title: 'Design an ATM System', difficulty: 'MEDIUM', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/atm.md', order: 10 },
      { id: 'lld-prac-11', topicId: 'topic-lld-practice', title: 'Design a Logging Framework', difficulty: 'MEDIUM', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/logging-framework.md', order: 11 },
      { id: 'lld-prac-12', topicId: 'topic-lld-practice', title: 'Design Stack Overflow', difficulty: 'HARD', type: 'PROJECT', externalUrl: 'https://github.com/ashishps1/awesome-low-level-design/blob/main/problems/stack-overflow.md', order: 12 },
    ]
  }
];

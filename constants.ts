
import { Badge, Flashcard } from './types';

export const INITIAL_PROGRESS = {
  level: 1,
  xp: 120,
  streak: 5,
  completedLessons: ['intro-to-ml', 'linear-regression'],
  badges: [
    { id: '1', name: 'Quick Learner', icon: '⚡', description: 'Completed 5 lessons in one day' },
    { id: '2', name: 'Math Whiz', icon: '🧮', description: 'Solved a complex calculus problem' }
  ]
};

export const SAMPLE_FLASHCARDS: Flashcard[] = [
  { front: 'What is Supervised Learning?', back: 'Learning from labeled data where the target outcome is known.', category: 'Fundamentals' },
  { front: 'Explain Overfitting.', back: 'When a model learns noise in the training data too well, failing to generalize to new data.', category: 'Concepts' },
  { front: 'What is a Gradient?', back: 'A vector of partial derivatives that points in the direction of steepest ascent.', category: 'Math' },
  { front: 'What does ReLU stand for?', back: 'Rectified Linear Unit, an activation function defined as f(x) = max(0, x).', category: 'Deep Learning' }
];

export const ML_TOPICS = [
  "Linear Regression",
  "Neural Networks",
  "Decision Trees",
  "Clustering",
  "Reinforcement Learning",
  "CNNs",
  "Transformers",
  "Support Vector Machines"
];

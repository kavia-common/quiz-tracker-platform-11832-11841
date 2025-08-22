/**
 * API service layer.
 * This file centralizes all API calls to allow easy swapping of the backend.
 * For now, it uses in-memory mock data to simulate the backend.
 */

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let MOCK_USER = null;

const MOCK_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'science', name: 'Science' },
  { id: 'history', name: 'History' },
  { id: 'tech', name: 'Technology' },
];

const MOCK_QUIZZES = [
  {
    id: 'q1',
    title: 'Basic Science',
    category: 'science',
    description: 'Test your general science knowledge.',
    questions: [
      {
        id: 'q1-1',
        text: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'],
        answerIndex: 1,
      },
      {
        id: 'q1-2',
        text: 'How many planets are in our Solar System?',
        options: ['7', '8', '9', '10'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'q2',
    title: 'World History',
    category: 'history',
    description: 'A quick dive into key historical facts.',
    questions: [
      {
        id: 'q2-1',
        text: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'George Washington', 'John Adams', 'Thomas Jefferson'],
        answerIndex: 1,
      },
      {
        id: 'q2-2',
        text: 'In which year did World War II end?',
        options: ['1942', '1943', '1945', '1948'],
        answerIndex: 2,
      },
    ],
  },
  {
    id: 'q3',
    title: 'Tech Fundamentals',
    category: 'tech',
    description: 'Basics of computing and the web.',
    questions: [
      {
        id: 'q3-1',
        text: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'HyperTool Multi Language',
          'Hyperlink and Text Markup Language',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3-2',
        text: 'Which company developed the React library?',
        options: ['Google', 'Facebook', 'Microsoft', 'Twitter'],
        answerIndex: 1,
      },
    ],
  },
];

let MOCK_RESULTS = [];

/**
 * PUBLIC_INTERFACE
 * Simulate login. Accepts any non-empty email/password.
 */
export async function apiLogin({ email, password }) {
  await delay(500);
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }
  MOCK_USER = { id: 'u1', email };
  return MOCK_USER;
}

/**
 * PUBLIC_INTERFACE
 * Simulate logout.
 */
export async function apiLogout() {
  await delay(200);
  MOCK_USER = null;
  return true;
}

/**
 * PUBLIC_INTERFACE
 * Get current user session.
 */
export async function apiGetCurrentUser() {
  await delay(200);
  return MOCK_USER;
}

/**
 * PUBLIC_INTERFACE
 * Fetch categories.
 */
export async function apiGetCategories() {
  await delay(200);
  return MOCK_CATEGORIES;
}

/**
 * PUBLIC_INTERFACE
 * Fetch quizzes, optionally filter by category.
 */
export async function apiGetQuizzes(categoryId = 'all') {
  await delay(300);
  if (categoryId === 'all') return MOCK_QUIZZES;
  return MOCK_QUIZZES.filter((q) => q.category === categoryId);
}

/**
 * PUBLIC_INTERFACE
 * Fetch a single quiz by id.
 */
export async function apiGetQuizById(id) {
  await delay(200);
  const quiz = MOCK_QUIZZES.find((q) => q.id === id);
  if (!quiz) throw new Error('Quiz not found');
  return quiz;
}

/**
 * PUBLIC_INTERFACE
 * Submit answers and compute result.
 */
export async function apiSubmitQuiz({ quizId, answers }) {
  await delay(400);
  const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);
  if (!quiz) throw new Error('Quiz not found');
  const total = quiz.questions.length;
  let correct = 0;
  quiz.questions.forEach((q, idx) => {
    if (answers[idx] === q.answerIndex) correct += 1;
  });
  const score = Math.round((correct / total) * 100);
  const result = {
    id: `r-${Date.now()}`,
    quizId,
    quizTitle: quiz.title,
    correct,
    total,
    score,
    date: new Date().toISOString(),
  };
  MOCK_RESULTS.unshift(result);
  return result;
}

/**
 * PUBLIC_INTERFACE
 * Get score history for the logged-in user.
 */
export async function apiGetHistory() {
  await delay(200);
  if (!MOCK_USER) return [];
  return MOCK_RESULTS;
}

import { MOCK_QUESTIONS } from '../mock/mockData';
import type { Question } from '../types/question';

const STORE_KEY = 'mock_questions';

export function initMockStore() {
  const stored = wx.getStorageSync(STORE_KEY);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    wx.setStorageSync(STORE_KEY, MOCK_QUESTIONS);
  }
}

export function readQuestions(): Question[] {
  return wx.getStorageSync(STORE_KEY) || [];
}

export function writeQuestions(questions: Question[]) {
  wx.setStorageSync(STORE_KEY, questions);
}

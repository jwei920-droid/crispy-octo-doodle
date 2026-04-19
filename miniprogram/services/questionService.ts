import { generateAnswer, generateIllustration } from './aiService';
import { readQuestions, writeQuestions } from './storageService';
import type { Question, QuestionListQuery, InputType } from '../types/question';

function sortByTimeDesc(items: Question[]) {
  return [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createQuestion(payload: {
  childOriginalQuestion: string;
  inputType: InputType;
  sceneTag?: string;
  ageStage: '3-4' | '4-5' | '5-6';
  parentNote?: string;
}): Promise<{ questionId: string; status: string }> {
  const now = new Date().toISOString();
  const questionId = `q_${Date.now()}`;
  const base: Question = {
    questionId,
    childOriginalQuestion: payload.childOriginalQuestion,
    normalizedQuestion: payload.childOriginalQuestion,
    createdAt: now,
    updatedAt: now,
    inputType: payload.inputType,
    sceneTag: payload.sceneTag,
    ageStage: payload.ageStage,
    parentNote: payload.parentNote,
    isFavorite: false,
    status: 'created'
  };

  const questions = readQuestions();
  questions.unshift(base);
  writeQuestions(questions);

  const answer = await generateAnswer(base);
  const image = await generateIllustration(questionId);
  const updated = readQuestions().map((item) =>
    item.questionId === questionId
      ? {
          ...item,
          ...answer,
          ...image,
          updatedAt: new Date().toISOString()
        }
      : item
  );
  writeQuestions(updated);

  return { questionId, status: 'completed' };
}

export async function getQuestionList(query: QuestionListQuery): Promise<{ items: Question[]; total: number }> {
  const { keyword, categoryTag, isFavorite, limit = 20, offset = 0 } = query;
  let items = sortByTimeDesc(readQuestions());

  if (keyword) {
    items = items.filter(
      (item) => item.normalizedQuestion.includes(keyword) || item.childOriginalQuestion.includes(keyword)
    );
  }

  if (categoryTag) {
    items = items.filter((item) => item.categoryTag === categoryTag);
  }

  if (typeof isFavorite === 'boolean') {
    items = items.filter((item) => item.isFavorite === isFavorite);
  }

  return {
    items: items.slice(offset, offset + limit),
    total: items.length
  };
}

export async function getQuestionDetail(questionId: string): Promise<Question | undefined> {
  return readQuestions().find((item) => item.questionId === questionId);
}

export async function toggleFavorite(questionId: string, isFavorite: boolean): Promise<{ questionId: string; isFavorite: boolean }> {
  const questions = readQuestions().map((item) =>
    item.questionId === questionId ? { ...item, isFavorite, updatedAt: new Date().toISOString() } : item
  );
  writeQuestions(questions);
  return { questionId, isFavorite };
}

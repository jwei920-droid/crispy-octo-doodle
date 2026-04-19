export type QuestionStatus =
  | 'draft'
  | 'created'
  | 'answer_generating'
  | 'answer_ready'
  | 'image_generating'
  | 'completed'
  | 'failed';

export type InputType = 'voice' | 'text' | 'image';

export type CategoryTag =
  | '动物'
  | '植物'
  | '天气'
  | '身体'
  | '食物'
  | '交通'
  | '自然现象'
  | '太空宇宙'
  | '日常生活'
  | '情绪与社交'
  | '安全与规则'
  | '节日与文化'
  | '其他';

export interface Question {
  questionId: string;
  childOriginalQuestion: string;
  normalizedQuestion: string;
  createdAt: string;
  updatedAt: string;
  inputType: InputType;
  sceneTag?: string;
  categoryTag?: CategoryTag;
  ageStage: '3-4' | '4-5' | '5-6';
  parentNote?: string;
  childAnswer?: string;
  storyAnswer?: string;
  parentTip?: string;
  illustrationUrl?: string;
  audioUrl?: string;
  repeatGroupId?: string;
  isFavorite: boolean;
  status: QuestionStatus;
}

export interface QuestionListQuery {
  keyword?: string;
  categoryTag?: CategoryTag | '';
  isFavorite?: boolean;
  limit?: number;
  offset?: number;
}

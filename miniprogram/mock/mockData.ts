import type { Question } from '../types/question';
import type { WeeklyReport } from '../types/report';

export const MOCK_QUESTIONS: Question[] = [
  {
    questionId: 'q_001',
    childOriginalQuestion: '为什么月亮会跟着我走？',
    normalizedQuestion: '为什么月亮看起来会跟着人走？',
    createdAt: '2026-04-19T12:00:00.000Z',
    updatedAt: '2026-04-19T12:00:00.000Z',
    inputType: 'voice',
    sceneTag: '晚间散步',
    categoryTag: '太空宇宙',
    ageStage: '4-5',
    childAnswer: '因为月亮离我们很远很远，所以你走路时，会觉得它一直陪着你。',
    storyAnswer: '天上的月亮像站在高高山顶的小灯。你走到哪里，它都看得见你。因为它太远了，看起来就像和你一起走路。',
    parentTip: '这是“远近视差”造成的视觉感受。可以继续问：远处的大楼会不会也像在跟着我们走？',
    illustrationUrl: 'https://dummyimage.com/600x400/fff3d8/333333&text=Moon+Walk',
    repeatGroupId: 'rg_moon_follow_01',
    isFavorite: false,
    status: 'completed'
  },
  {
    questionId: 'q_002',
    childOriginalQuestion: '为什么鱼不会淹死？',
    normalizedQuestion: '为什么鱼在水里不会淹死？',
    createdAt: '2026-04-18T09:30:00.000Z',
    updatedAt: '2026-04-18T09:30:00.000Z',
    inputType: 'text',
    sceneTag: '看绘本',
    categoryTag: '动物',
    ageStage: '4-5',
    childAnswer: '鱼有特别的小帮手，叫鱼鳃。鱼鳃能从水里拿到空气，所以它在水里也能呼吸。',
    storyAnswer: '小鱼像戴着一副“水里口罩”。它轻轻张嘴，水流过鱼鳃，鱼鳃就把空气请进身体里。',
    parentTip: '可补充“鱼鳃提取溶解氧”的概念。追问建议：那人为什么不能在水里呼吸呢？',
    illustrationUrl: 'https://dummyimage.com/600x400/e4f6ff/333333&text=Fish',
    repeatGroupId: 'rg_fish_01',
    isFavorite: true,
    status: 'completed'
  }
];

export const MOCK_WEEKLY_REPORT: WeeklyReport = {
  reportId: 'wr_001',
  weekStartDate: '2026-04-13',
  weekEndDate: '2026-04-19',
  questionCount: 8,
  topCategories: [
    { category: '动物', count: 3 },
    { category: '太空宇宙', count: 2 },
    { category: '日常生活', count: 2 }
  ],
  repeatedQuestions: [
    {
      repeatGroupId: 'rg_sleep_01',
      normalizedQuestion: '为什么人要睡觉？',
      count: 2
    }
  ],
  highlightedQuestions: [
    { questionId: 'q_001', normalizedQuestion: '为什么月亮看起来会跟着人走？' },
    { questionId: 'q_002', normalizedQuestion: '为什么鱼在水里不会淹死？' }
  ],
  parentSuggestions: [
    '本周孩子对“动物”和“天空”好奇度高，可继续用绘本讲解。',
    '重复问到睡觉问题，可从身体休息和做梦角度继续解释。'
  ],
  createdAt: '2026-04-19T13:00:00.000Z'
};

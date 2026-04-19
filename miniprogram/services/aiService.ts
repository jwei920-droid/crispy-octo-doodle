import type { Question } from '../types/question';

export async function generateAnswer(question: Question): Promise<Pick<Question, 'normalizedQuestion' | 'categoryTag' | 'childAnswer' | 'storyAnswer' | 'parentTip' | 'repeatGroupId' | 'status'>> {
  const normalizedQuestion = question.childOriginalQuestion.endsWith('？')
    ? question.childOriginalQuestion
    : `${question.childOriginalQuestion}？`;

  return {
    normalizedQuestion,
    categoryTag: question.categoryTag || '其他',
    childAnswer: '这是一个很棒的问题！我们先从身边的小现象慢慢看，就能找到答案。',
    storyAnswer: '想象有一个小小的“为什么精灵”，它把线索藏在你每天看到的事情里。我们一起观察，就会发现答案一点点跑出来。',
    parentTip: '当前为原型占位回答。后续会接入 LLM 生成儿童化解释，并补充 1-2 个延伸提问建议。',
    repeatGroupId: `rg_${question.questionId}`,
    status: 'answer_ready'
  };
}

export async function generateIllustration(questionId: string): Promise<Pick<Question, 'illustrationUrl' | 'status'>> {
  return {
    illustrationUrl: `https://dummyimage.com/600x400/ffe8cc/333333&text=${questionId}`,
    status: 'completed'
  };
}

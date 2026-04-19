export interface WeeklyReport {
  reportId: string;
  weekStartDate: string;
  weekEndDate: string;
  questionCount: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  repeatedQuestions: Array<{
    repeatGroupId: string;
    normalizedQuestion: string;
    count: number;
  }>;
  highlightedQuestions: Array<{
    questionId: string;
    normalizedQuestion: string;
  }>;
  parentSuggestions: string[];
  createdAt: string;
}

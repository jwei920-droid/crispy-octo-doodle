# 数据结构与接口文档（v0.1）

## 1. 数据模型

### 1.1 Question
```ts
type QuestionStatus =
  | 'draft'
  | 'created'
  | 'answer_generating'
  | 'answer_ready'
  | 'image_generating'
  | 'completed'
  | 'failed';

type InputType = 'voice' | 'text' | 'image';

type CategoryTag =
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

interface Question {
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
```

### 1.2 WeeklyReport
```ts
interface WeeklyReport {
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
```

---

## 2. 云函数 / API 清单

### 2.1 createQuestion
创建基础问题记录。

#### 请求
```json
{
  "childOriginalQuestion": "为什么月亮会跟着我走？",
  "inputType": "voice",
  "sceneTag": "晚间散步",
  "ageStage": "4-5",
  "parentNote": "在小区散步时问的"
}
```

#### 返回
```json
{
  "questionId": "q_001",
  "status": "created"
}
```

---

### 2.2 generateAnswer
基于问题生成标准化问题、三层回答、分类与重复识别。

#### 请求
```json
{
  "questionId": "q_001"
}
```

#### 返回
```json
{
  "questionId": "q_001",
  "normalizedQuestion": "为什么月亮看起来会跟着人走？",
  "categoryTag": "太空宇宙",
  "childAnswer": "因为月亮离我们特别特别远，所以你走路的时候，会觉得它一直在陪着你。",
  "storyAnswer": "月亮像一个站得很高很高的大灯，远远地看着你散步，所以你会觉得它总是在你旁边。",
  "parentTip": "这和远处物体视差很小有关。你可以继续问孩子：远处的山会不会也像在陪你走？",
  "repeatGroupId": "rg_moon_follow_01",
  "status": "answer_ready"
}
```

---

### 2.3 generateIllustration
为问题生成插画。

#### 请求
```json
{
  "questionId": "q_001"
}
```

#### 返回
```json
{
  "questionId": "q_001",
  "illustrationUrl": "https://example.com/q_001.png",
  "status": "completed"
}
```

---

### 2.4 getQuestionList
获取问题列表。

#### 请求
```json
{
  "keyword": "月亮",
  "categoryTag": "太空宇宙",
  "isFavorite": false,
  "limit": 20,
  "offset": 0
}
```

#### 返回
```json
{
  "items": [
    {
      "questionId": "q_001",
      "normalizedQuestion": "为什么月亮看起来会跟着人走？",
      "childOriginalQuestion": "为什么月亮会跟着我走？",
      "createdAt": "2026-04-19T20:00:00+08:00",
      "categoryTag": "太空宇宙",
      "isFavorite": true,
      "status": "completed"
    }
  ],
  "total": 1
}
```

---

### 2.5 getQuestionDetail
获取单条问题详情。

#### 请求
```json
{
  "questionId": "q_001"
}
```

#### 返回
返回完整 `Question` 对象。

---

### 2.6 toggleFavorite
切换收藏状态。

#### 请求
```json
{
  "questionId": "q_001",
  "isFavorite": true
}
```

#### 返回
```json
{
  "questionId": "q_001",
  "isFavorite": true
}
```

---

### 2.7 deleteQuestion
删除单条问题。

#### 请求
```json
{
  "questionId": "q_001"
}
```

#### 返回
```json
{
  "success": true
}
```

---

### 2.8 getWeeklyReport
获取指定周的周报。

#### 请求
```json
{
  "weekStartDate": "2026-04-13",
  "weekEndDate": "2026-04-19"
}
```

#### 返回
```json
{
  "reportId": "wr_001",
  "weekStartDate": "2026-04-13",
  "weekEndDate": "2026-04-19",
  "questionCount": 18,
  "topCategories": [
    { "category": "动物", "count": 6 },
    { "category": "太空宇宙", "count": 4 },
    { "category": "身体", "count": 3 }
  ],
  "repeatedQuestions": [
    {
      "repeatGroupId": "rg_sleep_01",
      "normalizedQuestion": "为什么人要睡觉？",
      "count": 3
    }
  ],
  "highlightedQuestions": [
    {
      "questionId": "q_003",
      "normalizedQuestion": "为什么鱼不会淹死？"
    }
  ],
  "parentSuggestions": [
    "孩子最近对动物很感兴趣，可以多用图片和绘本继续讲解。",
    "最近重复提到睡觉相关问题，可以从身体休息和做梦切入。"
  ],
  "createdAt": "2026-04-19T21:00:00+08:00"
}
```

---

## 3. 前端服务层建议

### questionService
- createQuestion
- getQuestionList
- getQuestionDetail
- deleteQuestion
- toggleFavorite

### aiService
- generateAnswer
- generateIllustration
- generateAudio

### reportService
- getWeeklyReport

---

## 4. 规则说明
- 所有时间使用 ISO 8601 字符串
- 分类枚举由服务端兜底
- 前端需兼容“回答已生成但图片未生成”的部分完成状态
- 一期默认单用户，不设计 userId 暴露给前端

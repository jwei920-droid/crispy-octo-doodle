# 技术选型与实施说明

## 1. 技术目标
在尽量低成本、低复杂度的前提下，快速实现一个可运行、可扩展的微信小程序 MVP。

## 2. 技术选型

### 2.1 前端
- **原生微信小程序**
- 语言建议：TypeScript
- 理由：
  - 与微信生态兼容性最好
  - 家庭版 MVP 无需跨端
  - 减少框架层不确定性

### 2.2 后端
- **微信云开发**
  - 云数据库
  - 云函数
  - 云存储

理由：
- 降低早期服务端部署复杂度
- 方便快速打通小程序能力
- 适合家庭版低并发场景

### 2.3 AI 能力拆分
建议拆分为 3 类服务：
1. 语音转文字（STT）
2. 问题整理与回答生成（LLM）
3. 儿童插画生成（Image Generation）
4. 文字转语音（TTS）

这些能力都通过统一 `aiService` 封装，页面不直接依赖具体供应商。

## 3. 系统结构建议

```text
微信小程序前端
  ├─ 页面层 pages/
  ├─ 组件层 components/
  ├─ 服务层 services/
  └─ 类型层 types/

微信云开发
  ├─ 云函数 createQuestion
  ├─ 云函数 generateAnswer
  ├─ 云函数 generateIllustration
  ├─ 云函数 getQuestionList
  ├─ 云函数 toggleFavorite
  └─ 云函数 getWeeklyReport

数据存储
  ├─ questions
  ├─ weekly_reports
  └─ assets / audio / images
```

## 4. 建议目录结构

```text
miniprogram/
  app.ts
  app.json
  app.wxss
  pages/
    home/
    question-detail/
    history/
    weekly-report/
  components/
    question-card/
    answer-tabs/
    answer-block/
    empty-state/
    loading-state/
    filter-bar/
  services/
    questionService.ts
    aiService.ts
    reportService.ts
    storageService.ts
  types/
    question.ts
    report.ts
    common.ts
  constants/
    categories.ts
    prompts.ts
  utils/
    date.ts
    format.ts
    validate.ts
cloudfunctions/
  createQuestion/
  generateAnswer/
  generateIllustration/
  getQuestionList/
  toggleFavorite/
  getWeeklyReport/
docs/
```

## 5. 数据流设计

### 5.1 创建问题
前端采集输入 → `createQuestion` → 写入 questions 集合 → 返回 questionId

### 5.2 生成回答
前端或后端触发 `generateAnswer` → 写回：
- normalizedQuestion
- childAnswer
- storyAnswer
- parentTip
- category
- repeatGroupId

### 5.3 生成图片
调用 `generateIllustration` → 存储图片 URL → 回写问题记录

### 5.4 获取历史列表
调用 `getQuestionList` → 按筛选条件返回列表

### 5.5 每周总结
调用 `getWeeklyReport` → 后端聚合 questions → 生成周报

## 6. 状态机建议
问题状态：
- `draft`：前端本地待提交
- `created`：已创建基础记录
- `answer_generating`
- `answer_ready`
- `image_generating`
- `completed`
- `failed`

## 7. 权限与隐私
需要处理的权限：
- 麦克风
- 相册 / 图片上传

要求：
- 首次调用前给出用途说明
- 拒绝权限后给出可理解引导
- 所有儿童相关内容默认私密存储

## 8. 错误处理
### 必须覆盖
- 录音失败
- 图片上传失败
- 回答生成失败
- 图片生成失败
- 列表加载失败
- 网络异常

### 展现方式
- 页面级错误状态
- 可重试按钮
- 不要只弹模糊 toast

## 9. 第一阶段实现策略
### 阶段 1：纯前端 mock
- 完成 UI 和交互
- 用静态假数据跑流程

### 阶段 2：接入云数据库
- 真正保存问题
- 读取历史列表

### 阶段 3：接入 AI
- 先接回答
- 再接图片
- 再接朗读

## 10. 非目标
当前不处理：
- 多端同步复杂策略
- 离线缓存优化
- 海量数据性能优化
- 复杂账号系统

# 儿童每日疑问（家庭版微信小程序）

本仓库文档用于指导 Codex 或开发者实现 **“儿童每日疑问”微信小程序一期 MVP**。

## 产品定位
面向家庭自用场景，帮助家长记录 3-6 岁孩子每天提出的问题，自动整理为可回看的问题卡片，并生成适合儿童理解的回答与配图。

## 一期边界
### 要做
- 语音 / 文字 / 图片记录问题
- 自动整理问题卡片
- 生成三层回答：小朋友版 / 故事版 / 家长提示版
- 生成儿童插画
- 历史记录、搜索、收藏
- 每周总结
- 语音朗读

### 不做
- 自制动画 / 视频
- 搜索和播放外部视频 / 动画
- 社区、社交、UGC
- 会员、积分、支付
- 多家庭协作

## 推荐技术路线
- 前端：原生微信小程序
- 后端：微信云开发（云函数 + 云数据库 + 云存储）
- 单用户家庭版 MVP，不先做复杂账号体系

## 文档目录
- `AGENTS.md`：给 Codex 的开发约束
- `docs/prd.md`：产品需求文档
- `docs/tech-spec.md`：技术方案
- `docs/pages.md`：页面详细说明
- `docs/api.md`：数据结构与接口契约
- `docs/ai-rules.md`：AI 内容与提示词规则
- `docs/dev-tasks.md`：开发任务拆解
- `docs/acceptance.md`：验收标准

## 开发目标
第一阶段先产出：
1. 可运行的小程序脚手架
2. 4 个主页面的基础 UI
3. mock 数据打通核心流程
4. 云函数和 AI 能力的接口骨架
5. 可逐步替换为真实能力的模块化结构

## 目录建议
```text
miniprogram/
  pages/
    home/
    question-detail/
    history/
    weekly-report/
  components/
    question-card/
    answer-block/
    empty-state/
    loading-state/
  services/
    questionService.ts
    aiService.ts
    reportService.ts
  utils/
  types/
cloudfunctions/
  createQuestion/
  generateAnswer/
  generateIllustration/
  getQuestionList/
  toggleFavorite/
  getWeeklyReport/
docs/
```

## 快速开发顺序
1. 搭项目脚手架
2. 完成全局导航与页面路由
3. 用 mock 数据完成首页 → 详情页 → 历史页主流程
4. 接入云数据库
5. 接入回答生成
6. 接入图片生成
7. 接入每周总结
8. 完成异常状态和体验细节

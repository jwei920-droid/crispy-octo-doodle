import { createQuestion, getQuestionList, toggleFavorite } from '../../services/questionService';
import { formatDateTime } from '../../utils/date';
import type { Question } from '../../types/question';

Page({
  data: {
    questionInput: '',
    loading: false,
    error: '',
    todayCount: 0,
    recentItems: [] as Question[]
  },

  onShow() {
    this.loadRecent();
  },

  async loadRecent() {
    this.setData({ loading: true, error: '' });
    try {
      const { items } = await getQuestionList({ limit: 3, offset: 0 });
      const today = new Date().toDateString();
      const todayCount = items.filter((item) => new Date(item.createdAt).toDateString() === today).length;
      const recentItems = items.map((item) => ({ ...item, createdAt: formatDateTime(item.createdAt) }));
      this.setData({ recentItems, todayCount });
    } catch (e) {
      this.setData({ error: '加载失败，点击重试' });
    } finally {
      this.setData({ loading: false });
    }
  },

  onInput(e: WechatMiniprogram.Input) {
    this.setData({ questionInput: e.detail.value });
  },

  async onSubmitText() {
    const text = this.data.questionInput.trim();
    if (!text) {
      wx.showToast({ title: '先输入孩子的问题', icon: 'none' });
      return;
    }
    const result = await createQuestion({
      childOriginalQuestion: text,
      inputType: 'text',
      ageStage: '4-5'
    });
    this.setData({ questionInput: '' });
    wx.navigateTo({ url: `/pages/question-detail/question-detail?questionId=${result.questionId}` });
  },

  onVoicePlaceholder() {
    wx.showToast({ title: '语音入口已预留（MVP 占位）', icon: 'none' });
  },

  onImagePlaceholder() {
    wx.showToast({ title: '图片入口已预留（MVP 占位）', icon: 'none' });
  },

  onOpenHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  },

  onOpenWeekly() {
    wx.navigateTo({ url: '/pages/weekly-report/weekly-report' });
  },

  onCardTap(e: WechatMiniprogram.CustomEvent<Question>) {
    wx.navigateTo({ url: `/pages/question-detail/question-detail?questionId=${e.detail.questionId}` });
  },

  async onCardFavorite(e: WechatMiniprogram.CustomEvent<Question>) {
    const item = e.detail;
    await toggleFavorite(item.questionId, !item.isFavorite);
    this.loadRecent();
  }
});

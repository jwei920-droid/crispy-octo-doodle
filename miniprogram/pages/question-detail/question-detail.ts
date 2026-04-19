import { getQuestionDetail, toggleFavorite } from '../../services/questionService';
import { formatDateTime } from '../../utils/date';
import type { Question } from '../../types/question';

Page({
  data: {
    questionId: '',
    loading: true,
    item: null as Question | null,
    activeReadType: 'child' as 'child' | 'story'
  },

  onLoad(query: { questionId?: string }) {
    if (query.questionId) {
      this.setData({ questionId: query.questionId });
      this.loadDetail();
    }
  },

  async loadDetail() {
    this.setData({ loading: true });
    const item = await getQuestionDetail(this.data.questionId);
    if (item) {
      this.setData({ item: { ...item, createdAt: formatDateTime(item.createdAt) } });
    }
    this.setData({ loading: false });
  },

  async onToggleFavorite() {
    const item = this.data.item;
    if (!item) return;
    await toggleFavorite(item.questionId, !item.isFavorite);
    this.loadDetail();
  },

  onReadChild() {
    this.setData({ activeReadType: 'child' });
    wx.showToast({ title: '已预留朗读能力', icon: 'none' });
  },

  onReadStory() {
    this.setData({ activeReadType: 'story' });
    wx.showToast({ title: '已预留朗读能力', icon: 'none' });
  }
});

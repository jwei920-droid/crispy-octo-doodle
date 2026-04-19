import { getWeeklyReport } from '../../services/reportService';
import type { WeeklyReport } from '../../types/report';

Page({
  data: {
    loading: true,
    report: null as WeeklyReport | null
  },

  onShow() {
    this.loadReport();
  },

  async loadReport() {
    this.setData({ loading: true });
    const report = await getWeeklyReport('2026-04-13', '2026-04-19');
    this.setData({ report, loading: false });
  },

  onOpenHighlight(e: WechatMiniprogram.BaseEvent) {
    const { questionId } = e.currentTarget.dataset;
    if (questionId) {
      wx.navigateTo({ url: `/pages/question-detail/question-detail?questionId=${questionId}` });
    }
  }
});

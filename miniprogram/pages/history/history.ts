import { CATEGORY_OPTIONS } from '../../constants/categories';
import { getQuestionList, toggleFavorite } from '../../services/questionService';
import { formatDateTime } from '../../utils/date';
import type { CategoryTag, Question } from '../../types/question';

Page({
  data: {
    loading: false,
    keyword: '',
    categoryTag: '' as CategoryTag | '',
    favoriteOnly: false,
    categories: CATEGORY_OPTIONS,
    items: [] as Question[]
  },

  onShow() {
    this.loadList();
  },

  async loadList() {
    this.setData({ loading: true });
    const { items } = await getQuestionList({
      keyword: this.data.keyword,
      categoryTag: this.data.categoryTag,
      isFavorite: this.data.favoriteOnly ? true : undefined,
      limit: 100
    });
    this.setData({
      items: items.map((item) => ({ ...item, createdAt: formatDateTime(item.createdAt) })),
      loading: false
    });
  },

  onKeywordInput(e: WechatMiniprogram.Input) {
    this.setData({ keyword: e.detail.value });
  },

  onCategoryChange(e: WechatMiniprogram.PickerChange) {
    const categoryTag = this.data.categories[Number(e.detail.value)] as CategoryTag | '';
    this.setData({ categoryTag }, () => this.loadList());
  },

  onToggleFavoriteFilter() {
    this.setData({ favoriteOnly: !this.data.favoriteOnly }, () => this.loadList());
  },

  onSearch() {
    this.loadList();
  },

  onCardTap(e: WechatMiniprogram.CustomEvent<Question>) {
    wx.navigateTo({ url: `/pages/question-detail/question-detail?questionId=${e.detail.questionId}` });
  },

  async onCardFavorite(e: WechatMiniprogram.CustomEvent<Question>) {
    await toggleFavorite(e.detail.questionId, !e.detail.isFavorite);
    this.loadList();
  }
});

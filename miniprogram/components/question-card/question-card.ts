import type { Question } from '../../types/question';

Component({
  properties: {
    item: {
      type: Object,
      value: {} as Question
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('cardtap', this.data.item);
    },
    onToggleFavorite() {
      this.triggerEvent('favorite', this.data.item);
    }
  }
});

import Ember from "ember";
const {
  computed,
  Component
} = Ember;

export default Component.extend({
  classNames: [ 'feed-articles' ],

  markReadDisabled: computed.not('feed.unreadCount'),

  actions: {

    markAllRead() {
      this.attrs.feed.value.markAllItemsRead();
    },

    deleteFeed() {
      if (confirm('Really delete this feed?')) {
        this.attrs.delete();
      }
    }
  }
});

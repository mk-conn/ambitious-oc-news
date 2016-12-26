import Ember from "ember";
const {computed, get} = Ember;

export default Ember.Component.extend({
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

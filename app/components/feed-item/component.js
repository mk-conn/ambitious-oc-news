import Ember from "ember";

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  classNames: [ 'feed-item' ],

  markReadDisabled: computed.not('feed.unreadCount'),

  actions: {

    markAllRead() {
      get(this, 'feed').markAllItemsRead();
    }
  }
});

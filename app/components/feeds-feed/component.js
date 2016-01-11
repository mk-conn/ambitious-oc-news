import Ember from 'ember';
const {computed, get} = Ember;

export default Ember.Component.extend({
  classNames: ['card', 'feeds-feed'],
  markReadDisabled: computed.not('feed.unreadCount'),
  actions: {
    markAllRead() {
      get(this, 'feed').markAllItemsRead();
    }
  }
});

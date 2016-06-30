import Ember from 'ember';

const {inject, get, computed} = Ember;

export default Ember.Component.extend({
  classNames: ['feed-item'],
  //classNameBindings: ['single', 'list', 'list:list-group-item', 'list:feed-item-link'],
  markReadDisabled: computed.not('feed.unreadCount'),
  actions: {
    markAllRead() {
      get(this, 'feed').markAllItemsRead();
    }
  }
});

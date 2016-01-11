import Ember from 'ember';

const {inject, get, computed} = Ember;

export default Ember.Component.extend({
  //router: inject.service('router'),
  classNames: ['feed-item', 'list-group-item', 'feed-item-link'],
  //classNameBindings: ['single', 'list', 'list:list-group-item', 'list:feed-item-link'],
  markReadDisabled: computed.not('feed.unreadCount'),
  click() {
    get(this, 'app').transitionTo('feeds.feed.items', get(this, 'feed'));
  },
  actions: {
    markAllRead() {
      get(this, 'feed').markAllItemsRead();
    }
  }
});

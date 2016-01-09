import Ember from 'ember';

const {inject, get, computed} = Ember;

export default Ember.Component.extend({
  //router: inject.service('router'),
  classNames: ['feed-item'],
  classNameBindings: ['single', 'list'],
  single: computed.equal('display', 'single'),
  list: computed.equal('display', 'list'),
  markReadDisabled: computed.not('feed.unreadCount'),
  actions: {
    markAllRead() {
      get(this, 'feed').markAllItemsRead();
    }
  }
});

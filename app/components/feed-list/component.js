import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['menu', 'feed-item'],

  actions: {

    markAllRead(feed) {
      feed.markAllItemsRead();
    }

  }
});

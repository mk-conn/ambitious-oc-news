import Ember from "ember";

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend({
  meta: inject.service(),

  classNames: [ 'feed-item' ],

  starredCount: computed.alias('meta.starredCount'),

  actions: {

    markAllRead(feed) {
      feed.markAllItemsRead();
    }

  }
});

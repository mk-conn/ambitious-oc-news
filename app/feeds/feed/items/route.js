import Ember from 'ember';
import Env from 'ember-oc-news/config/environment';

const {get, set, Route} = Ember;


export default Route.extend({
  model() {
    const feed = this.modelFor('feeds.feed');
    const batchSize = Env.APP.items.batchSize || 10;

    return this.store.query('item', {
      batchSize: batchSize,
      offset: 0,
      type: 0,
      id: get(feed, 'id'),
      getRead: true,
      oldestFirst: false
    });
  },
  afterModel(model) {
    set(model, 'feed', this.modelFor('feeds.feed'));
  }
});

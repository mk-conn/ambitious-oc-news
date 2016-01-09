import Ember from 'ember';
import Env from 'ember-oc-news/config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

const {get, set, Route} = Ember;

export default Route.extend(InfinityRoute, {
  _offset: undefined,
  _canLoadMore: true,
  init() {
    set(this, '_offset', undefined);
  },
  model() {
    const feed = this.modelFor('feeds.feed');
    const batchSize = Env.APP.items.batchSize || 10;

    return this.infinityModel('item', {
      batchSize: batchSize,
      type: 0,
      id: get(feed, 'id'),
      getRead: true,
      oldestFirst: false
    }, {
      offset: '_offset'
    });
  },
  afterModel(model) {
    set(model, 'feed', this.modelFor('feeds.feed'));
  },
  afterInfinityModel(items) {
    //console.log('route.js:afterInfinityModel', get(this, '_offset'));
    const lastObjectId = items.get('lastObject.id');
    const loadedAny = items.get('length') > 0;
    this.set('_canLoadMore', loadedAny);
    this.set('_offset', lastObjectId);
  },
  actions: {
    willTransition() {
      this.set('_offset', undefined);
    }
  }

});

import Ember from 'ember';
import Env from 'ambitious-oc-news/config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

const {
  get,
  set,
  computed
} = Ember;

export default Ember.Route.extend(InfinityRoute, {

  offset: "0",

  _canLoadMore: true,

  batchSize: Env.APP.articles.batchSize || "10",

  getRead: "true",

  oldestFirst: "false",

  feed: null,

  type: "0",

  // perPageParam: "",
  // pageParam: "offset",
  // totalPagesParam: "",

  init() {
    set(this, 'offset', undefined);
  },

  model() {
    Ember.debug('>>>> loading model for: feeds.show.items');
    Ember.debug('>>>> Feed-ID: ' + get(this.modelFor('feeds.show'), 'id'));

    // set(this, 'feed', get(this.modelFor('feeds.show'), 'id'));

    return this.infinityModel('item', {},
      {
        batchSize: 'batchSize',
        offset: 'offset',
        type: 'type',
        id: 'feed',
        getRead: 'getRead',
        oldestFirst: 'oldestFirst'
      });
  },

  afterModel(model) {
    set(model, 'feed', this.modelFor('feeds.show'));
  },

  afterInfinityModel(articles) {

    const lastObjectId = articles.get('lastObject.id');
    const loadedAny = articles.get('length') > 0;

    set(this, '_canLoadMore', loadedAny);
    set(this, 'offset', lastObjectId);

    Ember.debug('----- Articles offset: ' + get(this, 'offset') + ' -----');
  },

  renderTemplate() {
    this.render('feeds/show/items', {
      into: 'application',
      outlet: 'main'
    });
  },

  actions: {

    loading() {
      this.render('loading', {into: 'application'});
    },

    willTransition() {
      set(this, '_offset', undefined);
    }
  }
});

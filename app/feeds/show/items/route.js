import Ember from 'ember';
import ENV from 'ambitious-oc-news/config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

const {
  get,
  set
} = Ember;

export default Ember.Route.extend(InfinityRoute, {
  _offset: undefined,
  _canLoadMore: true,

  perPageParam: "batchSize",
  pageParam: "_offset",
  totalPagesParam: "",

  init() {
    set(this, '_offset', undefined);
  },

  model() {
    Ember.debug('-------- loading model for: feeds.show.items --------');

    const feed = this.modelFor('feeds/show');
    const batchSize = ENV.APP.articles.batchSize || 10;

    return this.infinityModel('item', {
        batchSize: batchSize,
        type: 0,
        id: get(feed, 'id'),
        getRead: true,
        oldestFirst: false
      },
      {
        offset: '_offset'
      });
  },

  afterModel(model) {
    set(model, 'feed', this.modelFor('feed/show'));
  },

  afterinfinityModel(articles) {
    const lastObjectId = articles.get('lastObject.id');
    const loadedAny = articles.get('length') > 0;

    set(this, '_canLoadMore', loadedAny);
    set(this, '_offset', lastObjectId);
  },

  renderTemplate() {
    this.render('feeds/show/items', {
      into: 'application',
      outlet: 'main'
    });
  },

  actions: {

    loading() {
      this.render('loading', {into : 'application'});
    },

    willTransition() {
      set(this, '_offset', undefined);
    }
  }
});

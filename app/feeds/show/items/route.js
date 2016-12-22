import Ember from "ember";
import Env from "ambitious-oc-news/config/environment";
import InfinityRoute from "ember-infinity/mixins/route";

const {
  get,
  set,
  computed,
  $,
  inject
} = Ember;

export default Ember.Route.extend(InfinityRoute, {

  gui: inject.service(),

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

  beforeModel(transition) {
    $('#article-list-container').animate({scrollTop: 0, duration: 400});
    this.get('gui').activate('article-list');
  },

  model() {
    Ember.debug('>>>> loading model for: feeds.show.items');
    Ember.debug('>>>> Feed-ID: ' + get(this.modelFor('feeds.show'), 'id'));

    set(this, 'feed', get(this.modelFor('feeds.show'), 'id'));

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
  /**
   *
   * @param model
   */
  afterModel(model) {
    Ember.debug('>>>> Feeds.Show.Items-Route::afterModel()');

    set(model, 'feed', this.modelFor('feeds.show'));

    Ember.debug('>>>> Feeds.Show.Items-Route::afterModel(): after set feed');
  },
  /**
   *
   * @param articles
   */
  afterInfinityModel(articles) {

    Ember.debug('>>>> Feeds.Show.Items-Route::afterInfinityModel()');

    const lastObjectId = articles.get('lastObject.id');
    const loadedAny = articles.get('length') > 0;

    set(this, '_canLoadMore', loadedAny);
    set(this, 'offset', lastObjectId);

    Ember.debug('>>>> Feeds.Show.Items-Route::afterInfinityModel(): after set');
    Ember.debug('----- Articles offset: ' + get(this, 'offset') + ' -----');
  },
  /**
   *
   */
  renderTemplate() {
    this.render('feeds/show/items', {
      into: 'application',
      outlet: 'article-list'
    });
  },


  actions: {
    /**
     *
     * @param feed
     */
    transitionToFeed(feed) {
      Ember.debug('>>>> transitionToFeed ' + feed.id);
      this.send('transition', 'feeds.show.items', feed);
    },
    /**
     *
     * @param article
     */

    // loading() {
    //   this.render(
    //     'feeds/show/items/loading', {
    //       into: 'feeds/items'
    //     });
    // },

    willTransition() {
      // scroll to top
      set(this, 'offset', "0");
      this.get('gui').deactivate('article-list');
      this._super(...arguments);

    }
  }
});

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
    this._super(...arguments);

    // $('#article-list-container').animate({scrollTop: 0, duration: 400});


  },

  model() {
    Ember.debug('++++ loading model for: feeds.show.articles');
    Ember.debug('++++ Feed-ID: ' + get(this.modelFor('feeds.show'), 'id'));

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

    Ember.run.scheduleOnce('afterRender', this, function () {
      this.get('gui').activate('article-list');
    });
  },
  /**
   *
   * @param articles
   */
  afterInfinityModel(articles) {

    Ember.debug('>>>> Articles offset: ' + get(this, 'offset') + ' -----');
    const lastObjectId = articles.get('lastObject.id');
    const loadedAny = articles.get('length') > 0;

    set(this, '_canLoadMore', loadedAny);
    set(this, 'offset', lastObjectId);

    Ember.debug('<<<< Articles offset: ' + get(this, 'offset') + ' -----');

  },

  renderTemplate() {
    this.render('feeds/show/articles', {
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
      this.send('transition', 'feeds.show.articles', feed);
    },
    /**
     *
     * @param article
     */

    loading() {
      this.render(
        'loading-articles', {
          into: 'application',
          outlet: 'article-list'
        });
    },

    willTransition(transition) {
      // scroll to top
      Ember.debug(`>>>> Feeds.Show.Articles::willTransition(${transition.targetName})`);

      if (transition.targetName === 'feeds.show.articles.index' || transition.targetName === 'feeds.show.articles') {
        set(this, 'offset', "0");
        this.get('gui').deactivate('article-list');

      }
      this._super(...arguments);
    }
  }
});

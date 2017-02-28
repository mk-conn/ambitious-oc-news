import Ember from "ember";
import Env from "nextfeed/config/environment";
import InfinityRoute from "ember-infinity/mixins/route";
import ActivateDeactivate from "nextfeed/mixins/activate-deactivate-view";


const {
  get,
  set,
  inject,
  Route,
  $
} = Ember;

export default Route.extend(InfinityRoute, ActivateDeactivate, {

  display: {
    activate: 'article-list',
    deactivate: 'article-list'
  },

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

  beforeModel() {
    Ember.debug(`>>>> feeds/show/articles/route::beforeModel()`);

    this._super(...arguments);

    $('#article-list-container').animate({scrollTop: 0, duration: 400});

    set(this, 'offset', undefined);

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
    Ember.debug('>>>> feeds/show/articles/route::afterModel()');

    set(model, 'feed', this.modelFor('feeds.show'));

    this._super(...arguments);

    // Ember.run.scheduleOnce('afterRender', this, function () {
    //   this.get('gui').activate('article-list');
    // });
  },
  /**
   *
   * @param articles
   */
  afterInfinityModel(articles) {

    Ember.debug('++++ Articles offset: ' + get(this, 'offset') + ' ++++');
    const lastObjectId = articles.get('lastObject.id');
    const loadedAny = articles.get('length') > 0;

    set(this, '_canLoadMore', loadedAny);
    set(this, 'offset', lastObjectId);

    Ember.debug('---- Articles offset: ' + get(this, 'offset') + ' -----');

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
      if (this.modelFor('feeds.show.articles')) {
        this.render(
          'loading-articles', {
            into: 'application',
            outlet: 'article-list'
          });
      }
    },

    willTransition(transition) {
      // scroll to top
      Ember.debug(`>>>> feeds/show/articles/route::willTransition(${transition.targetName})`);

      const targetName = transition.targetName;

      if (targetName === 'feeds.show.articles.index' || targetName === 'feeds.show.articles') {
        set(this, 'offset', "0");

      }
      if (targetName === 'feeds.index' || targetName === 'feeds') {
        this.get('gui').deactivate('article-list');
      }

      // this._super(...arguments);
    }
  }
});

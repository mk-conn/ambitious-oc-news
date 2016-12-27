import Ember from "ember";
import Env from "ambitious-oc-news/config/environment";
import InfinityRoute from "ember-infinity/mixins/route";

const {
  Route,
  inject,
  $,
} = Ember;

export default Route.extend(InfinityRoute, {

  gui: inject.service(),

  offset: "0",

  _canLoadMore: true,

  batchSize: Env.APP.articles.batchSize || "10",

  getRead: "true",

  oldestFirst: "false",

  feed: null,

  type: "2",


  beforeModel() {
    $('#article-list-container').animate({scrollTop: 0, duration: 400});

    this.get('gui').activate('article-list');
  },

  /**
   *
   */
  model() {
    Ember.debug(`>>>> feeds/pinned::model()`);

    return this.infinityModel('item', {},
      {
        batchSize: 'batchSize',
        offset: 'offset',
        type: 'type',
        getRead: 'getRead',
        oldestFirst: 'oldestFirst'
      });
  },

  /**
   *
   */
  renderTemplate()
  {

    Ember.debug(`>>>> feeds/pinned::renderTemplate()`);

    this.render('feeds/pinned', {
      into: 'application',
      outlet: 'article-list'
    });
  },
  /**
   * Actions
   */
  actions: {

    willTransition() {

      this.get('gui').deactivate('article-list');

      this._super(...arguments);

    }

  }

});

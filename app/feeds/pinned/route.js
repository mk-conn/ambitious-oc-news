import Ember from "ember";
import FeedsShowArticlesRoute from "ambitious-oc-news/feeds/show/articles/route";

export default FeedsShowArticlesRoute.extend({

  feed: null,

  type: "2",

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

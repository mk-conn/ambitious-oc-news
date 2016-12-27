import Ember from "ember";
import ActivateDeactivate from "ambitious-oc-news/mixins/activate-deactivate-view";

const {
  Route
} = Ember;

export default Route.extend(ActivateDeactivate, {

  display: {
    activate: 'article-overlay',
    deactivate: 'article-overlay'
  },

  /**
   *
   * @param params
   * @returns {*|Promise}
   */
  model(params) {
    Ember.debug(`>>>> feeds/pinned/article::model(${params})`);

    return this.store.findRecord('item', params.article_id);
  },

  renderTemplate() {
    this.render('feeds/pinned/show/article', {
      into: 'application',
      outlet: 'article-overlay'
    });
  }

});

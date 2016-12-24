import Ember from "ember";

const {
  Route,
  get,
  inject
} = Ember;

export default Route.extend({

  gui: inject.service(),

  beforeModel() {
    this.get('gui').activate('article-overlay');
  },

  /**
   *
   * @param article
   * @returns {*|DS.Model|null}
   */
  model(article) {
    Ember.debug('>>>> feeds/show/items/show: ' + article.id);

    return this.store.peekRecord('item', article.id);
  },

  renderTemplate() {
    this.render('feeds/show/articles/show', {
      into: 'feeds/show/articles',
      outlet: 'article-overlay'
    });
  },

  actions: {

    willTransition() {
      Ember.debug(`>>>> Feeds.Show.Articles.ShowRoute::willTransition()`);
      this.get('gui').deactivate('article-overlay');
    },

    closeArticle(article) {
      // Ember.debug(`Feeds.Show.Items.Show-Route::closeArticle(): ${article}`);
      // this.send('transition', 'feeds.show.articles', get(article, 'feed'));
    }
  }

});

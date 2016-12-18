import Ember from "ember";

const {
  Route,
  get
} = Ember;

export default Route.extend({
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
    this.render('feeds/show/items/show', {
      into: 'feeds/show/items',
      outlet: 'article-content'
    });
  },

  actions: {
    closeArticle(article) {
      Ember.debug(`Feeds.Show.Items.Show-Route::closeArticle(): ${article}`);
      this.send('transition', 'feeds.show.items', get(article, 'feed'));
    }
  }

});

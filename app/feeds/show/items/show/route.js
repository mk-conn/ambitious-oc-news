import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({

  model(article) {
    Ember.debug('>>>> feeds/show/items/show: ' + article.id);

    return this.store.peekRecord('item', article.id);
  },

  renderTemplate() {
    this.render('feeds/show/items/show', {
      into: 'feeds/show/items',
      outlet: 'article-content'
    });
  }

});

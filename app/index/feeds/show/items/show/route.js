import Ember from 'ember';

const {
  Route,
  $
} = Ember;

export default Route.extend({

  model(article) {
    Ember.debug('>>>> index/feeds/show/items/show: ' + article.id);

    return this.store.peekRecord('item', article.id);
  }

});

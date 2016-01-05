import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('item').filterBy('starred');
  },
  renderTemplate() {
    this.render('items/starred', {
      into: 'application',
      outlet: 'main'
    });
  }
});

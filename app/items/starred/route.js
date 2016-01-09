import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('item', {
      type: 2,
      getRead: true,
      oldestFirst: false
    });
  },
  renderTemplate() {
    this.render('items/starred', {
      into: 'application',
      outlet: 'main'
    });
  }
});

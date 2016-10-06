import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'divided', 'items'],

  click() {
    Ember.debug('>>>> clicked in article-list');
  },

  actions: {

  }
});

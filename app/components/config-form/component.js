import Ember from 'ember';
const {get, inject, set, Object} = Ember

export default Ember.Component.extend({

  actions: {
    submit() {
      this.sendAction('submit', get(this, 'config'));
    }
  }

});

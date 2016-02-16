import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  actions: {
    submit() {
      this.sendAction('submit', get(this, 'articleSettings'));
    }
  }
});

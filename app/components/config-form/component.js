import Ember from 'ember';
const {get, inject, set} = Ember

export default Ember.Component.extend({
  classNames: ['container', 'app-settings'],
  actions: {
    submit() {
     this.sendAction('submit');
    }
  }
});

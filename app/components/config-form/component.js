import Ember from "ember";
const {
  get,
  Component
} = Ember;

export default Component.extend({

  actions: {

    submit() {
      this.sendAction('submit', get(this, 'config'));
    }
  }

});

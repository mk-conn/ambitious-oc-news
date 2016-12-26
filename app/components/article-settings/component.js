import Ember from "ember";

const {get, computed} = Ember;

export default Ember.Component.extend({
  actions: {
    submit() {
      let allow = false;
      if (this.get('articleSettings.allowEmbedded') === false) {
        allow = true;
      }
      let settings = {allowEmbedded: allow};
      this.sendAction('submit', settings);
    }
  }
});

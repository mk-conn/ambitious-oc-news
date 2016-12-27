import Ember from "ember";

const {
  Component
} = Ember;

export default Component.extend({
  actions: {

    submit() {
      let allow = false;
      if (this.get('settings.allowEmbedded') === false) {
        allow = true;
      }
      let settings = {allowEmbedded: allow};
      this.sendAction('submit', settings);
    }
  }
});

import Ember from "ember";

const {
  Component
} = Ember;

export default Component.extend({

  name: null,

  actions: {

    submit() {
      Ember.debug(`>>>> components/add-folder::actions::submit(${this.get('folder.name')})`);

      this.sendAction('onCreateFolder', this.get('folder'));
    }
  }

});

import Ember from "ember";

const {
  Mixin,
  inject
} = Ember;

/**
 *
 */
export default Mixin.create({

  gui: inject.service(),

  display: null,

  afterModel() {
    let display = this.get('display');
    Ember.debug(`>>>> ActivateDeactivateMixin::afterModel(${display})`);
    if (display) {
      this.get('gui').activate(display.activate);
    }

    this._super(...arguments);
  },

  actions: {

    willTransition() {
      let display = this.get('display');
      Ember.debug(`>>>> ActivateDeactivateMixin::willTransition(${display})`);

      if (display) {
        this.get('gui').deactivate(display.activate);
      }

      this._super(...arguments);
    }
  }

});

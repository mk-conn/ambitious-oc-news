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
        Ember.debug(`mixins: activate-deactivate::afterModel(${display.activate})`);

        if (display) {
            this.get('gui').activate(display.activate);
        }

        this._super(...arguments);
    },

    actions: {

        willTransition() {
            let display = this.get('display');
            Ember.debug(`mixins: activate-deactivate::actions::willTransition(${display})`);

            if (display) {
                this.get('gui').deactivate(display.activate);
            }

            this._super(...arguments);
        }
    }

});

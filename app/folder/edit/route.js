import Ember from "ember";
import ActivateDeactivate from "nextfeeds/mixins/activate-deactivate-view";
import Protected from "nextfeeds/mixins/protected";

export default Ember.Route.extend(ActivateDeactivate, Protected, {

  display: {
    activate: 'content',
    deactivate: 'content'
  },

  /**
   *
   * @param params
   * @returns {*|Promise}
   */
  model(params) {
    return this.store.findRecord('folder', params.folder_id);
  },

  /**
   *
   */
  renderTemplate() {
    this.render('folder/edit', {
      into: 'application',
      outlet: 'content'

    });
  },

  actions: {
    rename() {

    },

    delete() {

    }
  }

});

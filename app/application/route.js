import Ember from 'ember';
// import ENV from 'ambitious-oc-news/config/environment';
import Protected from 'ambitious-oc-news/mixins/protected';

const {
  Route,
  get,
  inject,
  RSVP,
  A,
  $
} = Ember;

export default Route.extend(Protected, {

  moment: inject.service(),
  config: inject.service('configuration'),

  beforeModel() {
    this._super(...arguments);

    var lang = (navigator.language || navigator.browserLanguage).split('-')[0];
    this.get('moment').changeLocale(lang);

  },



  actions: {

    openModal(name) {
      $('.ui.' + name + '.modal').modal('show');
    },

    transition(route, model) {
      this.transitionTo(route, model);
    },

    toggle(id) {
      $(`#${id}`).sidebar('toggle');
    }

  }

});

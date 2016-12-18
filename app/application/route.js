import Ember from "ember";
// import ENV from 'ambitious-oc-news/config/environment';
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  get,
  inject,
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
    willTransition(){
      console.log('routename:', this.routeName);
      console.log('currentRouteName:', this.get('currentRouteName'));
      this.controllerFor('application').set('lastRoute', this.routeName);
    },
    goBack(){
      let appController = this.controllerFor('application');
      this.transitionTo(appController.get('lastRoute'));
    },

    openModal(name) {
      Ember.debug('>>>> Open modal ' + name);

      $('.ui.' + name + '.modal').modal('show');
    },

    transition(route, model) {
      Ember.debug(`>>>> AppRoute::transition('${route}, ${model}`);

      this.transitionTo(route, model);
    },

    toggle(id) {
      $(`#${id}`).sidebar('toggle');
    }

  }

});

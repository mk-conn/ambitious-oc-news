import Ember from 'ember';

const {inject} = Ember;
export default Ember.Route.extend({
  moment: inject.service(),
  beforeModel() {
    var lang = (navigator.language || navigator.browserLanguage).split('-')[0];
    this.get('moment').changeLocale(lang);
  }
});

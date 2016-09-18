import Ember from 'ember';
import ENV from 'ambitious-oc-news/config/environment';
const {inject, get, computed} = Ember;

export default Ember.Mixin.create({
  config: inject.service('configuration'),
  authorized: computed(function () {
    return !!this.get('config').retrieve('oc_conn');
  }),
  beforeModel()
  {
    if (this.get('authorized') === false) {
      let loginPath = ENV.APP.DefaultLoginRoute;
      this.transitionTo(loginPath);
    }

    this._super(...arguments);
  },
});

import Ember from "ember";
import Env from "ambitious-oc-news/config/environment";
const {
  inject,
  // get,
  computed,
  Mixin
} = Ember;

export default Mixin.create({

  config: inject.service('configuration'),

  authorized: computed(function () {
    return !!this.get('config').retrieve('oc_conn');
  }),

  beforeModel()
  {
    if (this.get('authorized') === false) {
      let loginPath = Env.APP.DefaultLoginRoute;
      Ember.debug('---- Login path: ' + loginPath + '-----');
      Ember.debug('--- current route: ' + this.get('routeName'));

      this.transitionTo(loginPath);
    }

    this._super(...arguments);
  }

});

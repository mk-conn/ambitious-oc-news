import Ember from 'ember';
import Env from 'ambitious-oc-news/config/environment';

const {
  inject,
  get,
  set
  } = Ember;


export default Ember.Route.extend({
  configuration: inject.service(),
  auth: inject.service(),
  beforeModel() {
    const config = get(this, 'configuration');
    if (config.retrieve('oc_conn')) {
      this.transitionTo(Env.APP.DefaultRouteAfterLogin);
    }
  },
  model() {
    return Ember.Object.create({
      username: null,
      password: null,
      domain: null,
      persist: false
    });
  },
  actions: {
    authenticate() {
      let model = get(this, 'currentModel');
      let {domain, username, password, persist} = model.getProperties('domain', 'username', 'password', 'persist');

      const auth = get(this, 'auth');

      const options = {
        username: username,
        password: password,
        persist: persist,
        domain: domain
      };

      auth.authorize(options).then((success) => {
        set(model, 'success', success + '<p>You are now being redirected to feeds - this may take a while</p>'.htmlSafe());
        this.transitionTo(Env.APP.DefaultRouteAfterLogin);
      }, error => {
        set(model, 'error', error);
      });

      return false;
    }
  }
});

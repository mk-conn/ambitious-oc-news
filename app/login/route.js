import Ember from 'ember';
import Env from 'ember-oc-news/config/environment';

const {
  inject,
  get,
  set
  } = Ember;


export default Ember.Route.extend({
  configuration: inject.service(),
  beforeModel() {
    const config = get(this, 'configuration');
    if (config.retrieve()) {
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
      let config = get(this, 'currentModel');
      let {domain, username, password, persist} = config.getProperties('domain', 'username', 'password', 'persist');

      const configuration = get(this, 'configuration');

      const options = {
        username: username,
        password: password,
        persist: persist,
        domain: domain
      };

      configuration.save(options).then((success) => {
        set(config, 'success', success + '<p>You are now being redirected to feeds - this may take a while</p>'.htmlSafe());
        this.transitionTo(Env.APP.DefaultRouteAfterLogin);
      }, error => {
        set(config, 'error', error);
      });

      return false;
    }
  }
});

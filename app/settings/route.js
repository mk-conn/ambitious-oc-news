import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';

const {get, RSVP, set} = Ember;

export default Ember.Route.extend(Protected, {

  model() {
    return Ember.Object.create(get(this, 'configuration').retrieve());
  },
  actions: {
    modifyConfiguration() {

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
        set(config, 'success', success);
        this.store.unloadAll();
      }, error => {
        set(config, 'error', error);
      });

      return false;
    }
  }
});

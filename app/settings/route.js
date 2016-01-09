import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';

const {get, set, inject, Object} = Ember;

export default Ember.Route.extend(Protected, {
  auth: inject.service(),
  config: inject.service('configuration'),
  model() {
    return Object.create(get(this, 'configuration').retrieve('oc_conn'));
  },
  actions: {
    alterAuth() {
      const oldUsername = get(get(this, 'config').retrieve('oc_conn'), 'username');
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
        set(model, 'success', success);
        if (oldUsername !== username) {
          get(this, 'config').remove('folders');
        }
        this.store.unloadAll();
      }, error => {
        set(model, 'error', error);
      });

      return false;
    }
  }
});

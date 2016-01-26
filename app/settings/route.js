import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';

const {get, set, inject, Object, RSVP} = Ember;

export default Ember.Route.extend(Protected, {
  auth: inject.service(),
  config: inject.service('configuration'),
  model() {
    return RSVP.hash({
      conn: Object.create(get(this, 'configuration').retrieve('oc_conn')),
      feed: Object.create({}),
      folders: this.store.findAll('folder')
    });
  },
  actions: {
    setupConnection(model) {
      set(model, 'success', null);
      set(model, 'error', null);

      const oldUsername = get(get(this, 'config').retrieve('oc_conn'), 'username');
      //let model = get(this, 'currentModel');
      let {domain, username, password, persist} = model.getProperties('domain', 'username', 'password', 'persist');
      //console.log('route.js:setupConnection', model);
      const auth = get(this, 'auth');

      const options = {
        username: username,
        password: password,
        persist: persist,
        domain: domain
      };

      auth.authorize(options).then((success) => {

        set(model, 'success', success);
        console.log('route.js:', success);
        if (oldUsername !== username) {
          get(this, 'config').remove('folders');
        }
        this.store.unloadAll();
      }, error => {
        set(model, 'error', error);
      });

      return false;
    },
    /**
     *
     * @param name
     * @returns {*}
     **/
    createFolder(name) {
      console.log('route.js:createFolder', name);
      return this.store.createRecord('folder', {name: name});
    },

    createFeed(model) {
      set(model, 'success', false);
      set(model, 'error', false);

      if (!get(model, 'url')) {
        set(model, 'error', 'Enter an url.');
        return;
      }

      let feed = this.store.createRecord('feed', {
        url: get(model, 'url')
      });

      let withOrWithoutFolder = new RSVP.Promise((resolve, reject) => {
        const folder = get(model, 'folder');
        if (folder && get(folder, 'isNew')) {
          folder.save().then((folder) => {
            feed.set('folder', folder);
          }, error => {
            reject(error);
          });
        } else {
          feed.set('folder', folder);
        }
        resolve(feed);
      });

      withOrWithoutFolder.then((feed) => {

        feed.save().then((feed) => {
          set(model, 'success', {
            id: get(feed, 'id'),
            title: get(feed, 'title'),
            faviconLink: get(feed, 'faviconLink')
          });
        }, error => {
          set(model, 'error', error);
        });

      });
    }
  }
})
;

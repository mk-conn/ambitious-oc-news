import Ember from 'ember';
import ENV from 'ambitious-oc-news/config/environment';

const {
  Route,
  RSVP,
  get,
  A,
  inject,
  computed
} = Ember;

export default Route.extend({
  moment: inject.service(),
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

    var lang = (navigator.language || navigator.browserLanguage).split('-')[0];
    this.get('moment').changeLocale(lang);

    this._super(...arguments);
  },
  model()
  {
    if (this.get('authorized')) {
      let promises = {
        folders: this.store.findAll('folder'),
        feeds: this.store.findAll('feed')
      };

      let model = Ember.Object.create({
        folders: [],
        feeds: []
      });

      return RSVP.hash(promises).then(hash => {
        let unfoldered = new A();

        hash.feeds.forEach(feed => {
          let folder = this.store.peekRecord('folder', get(feed, 'folderId'));

          if (folder) {
            folder.get('feeds').addObject(feed);
          } else {
            unfoldered.addObject(feed);
          }
        });

        unfoldered.forEach(feedItem => {
          model.get('feeds').addObject(feedItem);
        });

        this.store.peekAll('folder').forEach(folder => {
          model.get('folders').addObject(folder);
        });

        return model;
      });
    }
  },
  afterModel(model)
  {
    // this.syncFoldersInConfig(model);
  },
  markAllRead()
  {

  },
  syncFoldersInConfig(model)
  {
    let changed = false;

    const folderIds = get(model, 'folders').getEach('id');
    const folders = get(this, 'config').retrieve('folders');


    if (folders) {
      folders.forEach((folder) => {
        const id = get(folder, 'id');

        if (folderIds.indexOf(id) < 0) {
          folders.removeObject(folder);
          changed = true;
        }
      });
    }

    if (changed) {
      get(this, 'config').store('folders', JSON.stringify(folders));
    }
  }

})
;

import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';
const {A, RSVP, get, set, inject} = Ember;

export default Ember.Route.extend(Protected, {
  config: inject.service('configuration'),
  model() {

    let promises = {
      folders: this.store.findAll('folder'),
      feeds: this.store.findAll('feed')
    };

    let items = Ember.Object.create({
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
        items.get('feeds').addObject(feedItem);
      });

      this.store.peekAll('folder').forEach(folder => {
        items.get('folders').addObject(folder);
      });

      return items;
    });
  },
  afterModel(model) {
    // this.syncFoldersInConfig(model);
  },
  markAllRead() {

  },
  syncFoldersInConfig(model) {
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
});

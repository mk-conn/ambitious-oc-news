import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';
const {A, RSVP, get, inject} = Ember;

export default Ember.Route.extend(Protected, {
  config: inject.service('configuration'),
  model() {

    let promises = {
      folders: this.store.findAll('folder'),
      feeds: this.store.findAll('feed')
    };

    let unfoldered = new A();

    return RSVP.hash(promises).then(hash => {

      hash.feeds.forEach(feed => {
        let folder = this.store.peekRecord('folder', get(feed, 'folderId'));

        if (folder) {
          folder.get('feeds').addObject(feed);
        } else {
          unfoldered.addObject(feed);
        }
      });

      return {
        feeds: hash.feeds,
        unfoldered: unfoldered,
        folders: this.store.peekAll('folder'),
        //items: hash.items,
        //starred: hash.items.filterBy('starred', true)
      };

    });
  },
  afterModel(model) {
    this.syncFoldersInConfig(model);

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

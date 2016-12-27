import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  RSVP,
  A,
  get,
  inject
} = Ember;

export default Route.extend(Protected, {

  meta: inject.service(),

  /**
   *
   */
  model() {
    Ember.debug('>>>> Feeds.model()');

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

  },
  /**
   *
   * @param model
   */
  afterModel(model) {
    this.syncFoldersInConfig(model);
  },

  /**
   *
   * @param model
   */
  syncFoldersInConfig(model)  {
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
  },
  /**
   *
   */
  renderTemplate() {

    this.render('feeds', {
      into: 'application',
      outlet: 'main'
    });

    this.render('index/index', {
      into: 'application',
      outlet: 'article-list'
    });

  },
  /**
   *
   */
  actions: {

    refresh() {

    },

    closeArticle() {
      // this.send('transition', 'feeds.show.items', this.modelFor('feeds.show'));
    },

    /**
     *
     * @param feed
     */
    deleteFeed(feed) {
      if (confirm(`Really delete feed ${get(feed, 'title')}?`)) {
        feed.deleteRecord();

        if (feed.get('isDeleted')) {
          feed.save().then(() => {
            this.transitionTo('index');
          });
        }
      }
    },

    deleteFolder(folder) {
      if (confirm(`Really delete folder "${get(folder, 'name')}" and all its containing feeds?`)) {
        folder.deleteRecord();

        if (folder.get('isDeleted')) {
          folder.save().then(() => {
            this.transitionTo('index');
          });
        }
      }
    },
    /**
     *
     * @param folder
     * @param name
     */
    renameFolder(folder, name) {

    },

    /**
     *
     * @param feed
     */
    markAllArticlesAsRead(feed) {
      Ember.debug('>>>> feeds::markAllArticlesAsRead()');

      feed.markAllItemsRead();

    }
  }

});

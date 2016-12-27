import Ember from "ember";
const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({

  folderIcon: computed('folderOpen', function () {
    if (get(this, 'folderOpen')) {
      return 'fa-folder-open';
    }
    return 'fa-folder';
  }),

  folderOpen: computed.not('folder.isClosed'),

  actions: {

    toggleFolderClosed() {
      get(this, 'folder').toggleClosed();
    },

    markFolderRead() {
      get(this, 'folder').markAllRead();
    }
  }
});

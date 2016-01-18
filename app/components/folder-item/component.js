import Ember from 'ember';
const {get, set, computed} = Ember;

export default Ember.Component.extend({
  classNames: ['card folder-item'],
  //unreadCount: computed.sum('folder.feeds.@each.unreadCount'),
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

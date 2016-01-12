import DS from 'ember-data';
import Ember from 'ember';

const {attr, hasMany} = DS;
const {computed, inject, A, get, set, Object, observer} = Ember;

export default DS.Model.extend({
  configuration: inject.service(),
  name: attr('string'),
  feeds: hasMany('feed', {async: false}),
  unreadFeedCounts: computed('feeds.@each.unreadCount', function() {
    var feeds = this.get('feeds');
    return feeds.mapBy('unreadCount');
  }),
  unreadCount: computed.sum('unreadFeedCounts'),

  toggleClosed() {
    if (this.get('isClosed')) {
      this.set('isClosed', false);
    } else {
      this.set('isClosed', true);
    }
  },
  isClosed: computed({
    get() {
      const folderId = this.get('id');
      const config = this.get('configuration');
      let folders = config.retrieve('folders');

      if (folders) {
        const folder = folders.findBy('id', folderId);
        if (folder) {
          return get(folder, 'closed');
        }
      }

      return false;

    },
    set(type, closed) {

      const config = this.get('configuration');
      const id = this.get('id');

      let folders = config.retrieve('folders');

      if (folders) {
        let folder = folders.findBy('id', id);

        if (folder) {
          set(folder, 'closed', closed);
          folders.removeObject(folder);
        } else {
          folder = Object.create({id: id, closed: closed});
        }
        folders.addObject(folder);
      } else {
        folders = new A();
        folders.addObject({id: id, closed: closed});
      }

      const value = JSON.stringify(folders);
      config.store('folders', value);

      return closed;
    }


  })
});

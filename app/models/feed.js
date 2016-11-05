import DS from 'ember-data';
import Ember from 'ember';

const {attr, belongsTo, hasMany} = DS;
const {computed, get} = Ember;

export default DS.Model.extend({
  added: attr('date'),
  folderId: attr('number'),
  faviconLink: attr('string'),
  link: attr('string'),
  pinned: attr('boolean'),
  title: attr('string'),
  unreadCount: attr('number'),
  url: attr('string'),
  folder: belongsTo('folder'),
  articles: hasMany('article'),
  feedIcon: computed('faviconLink', function () {
    let iconUrl = this.get('faviconLink');

    if (iconUrl) {
      const proto = /^http:|https:/;

      return iconUrl.replace(proto, '');
    }

    return null;

  }),
  markAllItemsRead() {
    this.set('_updateEndpoint', '/feeds/' + this.get('id') + '/read');
    this.set('_updateVerb', 'PUT');

    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('_updateVerb', null);

      get(this, 'items').setEach('unread', false);
      this.set('unreadCount', Number(0));
    });

    return promise;
  },
  rename() {
    this.set('_updateEndpoint', '/feeds/' + this.get('id') + '/rename');
    this.set('_updateVerb', 'PUT');
    //this.set('title', title);

    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('_updateVerb', null);
    });

    return promise;
  }
});

import DS from "ember-data";
import Ember from "ember";

const {attr, belongsTo} = DS;
const {inject} = Ember;


export default DS.Model.extend({

  meta: inject.service(),

  feed: belongsTo('feed'),
  guid: attr('string'),
  guidHash: attr('string'),
  url: attr('string'),
  title: attr('string'),
  author: attr('string'),
  pubDate: attr('string'),
  body: attr('string'),
  enclosureMime: attr('string'),
  enclosureLink: attr('string'),
  unread: attr('boolean'),
  starred: attr('boolean'),
  lastModified: attr('date'),
  feedId: attr('number'),
  searchIndex: attr('string'),

  markRead() {
    this.set('_updateEndpoint', '/items/' + this.get('id') + '/read');
    let promise = this.save();

    promise.finally(() => {

      this.get('feed').then((feed) => {
        const unreadCount = feed.decrementProperty('unreadCount');

        feed.set('unreadCount', unreadCount);
      });

      this.set('_updateEndpoint', null);
      this.set('unread', false);
    });

    return promise;
  },

  markUnread() {
    this.set('_updateEndpoint', '/items/' + this.get('id') + '/unread');
    let promise = this.save();

    promise.finally(() => {

      this.get('feed').then(feed => {
        const unreadCount = feed.incrementProperty('unreadCount');
        feed.set('unreadCount', unreadCount);
      });

      this.set('_updateEndpoint', null);
      this.set('unread', true);
    });

    return promise;
  },

  star() {
    this.set('_updateEndpoint', '/items/' + this.get('feedId') + '/' + this.get('guidHash') + '/star');
    let promise = this.save();

    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('starred', true);

      this.get('meta').incrementProperty('starredCount');

    });

    return promise;
  },

  unstar() {
    this.set('_updateEndpoint', '/items/' + this.get('feedId') + '/' + this.get('guidHash') + '/unstar');
    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('starred', false);
      this.get('meta').decrementProperty('starredCount');
    });
    return promise;
  }

});

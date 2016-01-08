import DS from 'ember-data';
const {attr, belongsTo} = DS;

export default DS.Model.extend({
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
    this.set('_updateEndpoint', 'items/' + this.get('id') + '/read');
    let promise = this.save();

    promise.finally(() => {

      this.get('feed').then((feed) => {
        const unreadCount = feed.get('unreadCount') - 1;

        feed.set('unreadCount', unreadCount);
      });

      this.set('_updateEndpoint', null);
      this.set('unread', false);
    });

    return promise;
  },
  markUnread() {
    this.set('_updateEndpoint', 'items/' + this.get('id') + '/unread');
    let promise = this.save();

    promise.finally(() => {

      this.get('feed').then(feed => {
        const unreadCount = feed.get('unreadCount') + 1;
        feed.set('unreadCount', unreadCount);
      });

      this.set('_updateEndpoint', null);
      this.set('unread', true);
    });

    return promise;
  },
  star() {
    this.set('_updateEndpoint', 'items/' + this.get('feedId') + '/' + this.get('guidHash') + '/star');
    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('starred', true);
    });

    return promise;
  },
  unstar() {
    this.set('_updateEndpoint', 'items/' + this.get('feedId') + '/' + this.get('guidHash') + '/unstar');
    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('starred', false);
    });
    return promise;
  }

});

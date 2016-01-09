import DS from 'ember-data';
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  added: attr('date'),
  folderId: attr('number'),
  faviconLink: attr('string'),
  link: attr('string'),
  pinned: attr('boolean'),
  title: attr('string'),
  unreadCount: attr('number'),
  url: attr('string'),
  folder: belongsTo('folder', {async: false}),
  items: hasMany('item', {async: false}),
  newestItemId: attr('number'),

  markAllItemsRead() {
    this.set('_updateEndpoint', 'feeds/' + this.get('id') + '/read');
    this.set('_updateVerb', 'PUT');

    let promise = this.save();
    promise.finally(() => {
      this.set('_updateEndpoint', null);
      this.set('_updateVerb', null);

      this.get('items').setEach('unread', false);

      this.set('unreadCount', 0);
    });

    return promise;
  }
});

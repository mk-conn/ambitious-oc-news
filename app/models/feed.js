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
  items: hasMany('item', {async: false})
});

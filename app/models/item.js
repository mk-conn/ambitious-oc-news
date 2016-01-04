import DS from 'ember-data';
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  feed: belongsTo('feed'),
  guid: attr('string'),
  guidHash: attr('string'),
  url: attr('string'),
  title: attr('string'),
  author: attr('string'),
  pubDate: attr('date'),
  body: attr('string'),
  enclosureMime: attr('string'),
  enclosureLink: attr('string'),
  unread: attr('boolean'),
  starred: attr('boolean'),
  lastModified: attr('date'),
  feedId: attr('number'),
  searchIndex: attr('string')
});

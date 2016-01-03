import DS from 'ember-data';
import Ember from 'ember';

const {attr, hasMany} = DS;
const {computed} = Ember;

export default DS.Model.extend({
  name: attr('string'),
  feeds: hasMany('feed', {async: false}),
  unreadFeedCounts: computed.mapBy('feeds.@each', 'unreadCount'),
  unreadCount: computed.sum('unreadFeedCounts')
});

import Ember from 'ember';

export default Ember.Mixin.create({
  unread: Ember.computed.mapBy('items.@each', 'unread', true),
  unreadCount: Ember.computed.sum('unread'),
  totalCount: Ember.computed.alias('items.length')
});

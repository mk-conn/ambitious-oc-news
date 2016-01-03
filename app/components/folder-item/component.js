import Ember from 'ember';
const {get} = Ember;

export default Ember.Component.extend({
  classNames: ['card'],
  unreadCount: Ember.computed.sum('feeds.@each.unreadCount'),
  actions: {
    closeFolder() {
      console.log('component.js:closeFolder', 'clicked');
    }
  }
});

import Ember from 'ember';
import Counting from 'ambitious-oc-news/mixins/unread-read';

export default Ember.Component.extend(Counting, {
  classNames: ['list-group-item', 'feed-item', 'feed-item-link'],
  click() {
    this.get('app').transitionTo('feeds.items.starred');
  }
});

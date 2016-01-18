import Ember from 'ember';
import Counting from 'ambitious-oc-news/mixins/unread-read';

const {inject, get, computed} = Ember;

export default Ember.Component.extend(Counting, {
  meta: inject.service(),
  starredCount: computed.alias('meta.starredCount'),
  classNames: ['list-group-item', 'feed-item', 'feed-item-link'],
  click() {
    this.get('app').transitionTo('feeds.items.starred');
  }
});

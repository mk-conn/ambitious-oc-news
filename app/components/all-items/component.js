import Ember from 'ember';
import Counting from 'ember-oc-news/mixins/unread-read';

export default Ember.Component.extend(Counting, {
  classNames: ['list-group-item', 'feed-item'],

  click() {
    this.get('app').transitionTo('items.all');
  }
});

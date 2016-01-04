import Ember from 'ember';

const {inject, get} = Ember;

export default Ember.Component.extend({
  router: inject.service('router'),
  classNames: ['list-group-item feed-item'],
  click() {
    get(this, 'app').transitionTo('feeds.feed', get(this, 'feed'));
  }
});

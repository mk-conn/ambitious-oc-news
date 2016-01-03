import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  classNames: ['card'],
  body: Ember.computed('item.body', function () {
    return get(this, 'item.body').htmlSafe();
  })
});

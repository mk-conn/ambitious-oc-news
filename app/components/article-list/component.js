import Ember from 'ember';

const {
  $,
  Component
} = Ember;

export default Component.extend({
  classNames: ['ui', 'divided', 'items'],

  didInsertElement() {
    // $('#article-list-container').animate({scrollTop: 0}, 200);
  }

});

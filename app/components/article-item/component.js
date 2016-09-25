import Ember from 'ember';

const {get, $, set, computed, observer, run, typeOf, inject} = Ember;

export default Ember.Component.extend({
  config: inject.service('configuration'),
  classNames: ['article', 'item'],
  classNameBindings: ['isUnread'],
  excerpt: computed('article.body', function () {
    const stripAt = 160;
    let text = $(get(this, 'article.body')).text();
    if (text.length > stripAt) {
      text = text.slice(0, stripAt) + ' ...'.htmlSafe();
    }
    return text;
  }),
  body: computed('article.body', function () {
    return get(this, 'article.body').htmlSafe();
  })
});

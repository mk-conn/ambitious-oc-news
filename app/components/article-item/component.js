import Ember from 'ember';

const {get, $, set, computed, observer, run, typeOf, inject} = Ember;

export default Ember.Component.extend({
  config: inject.service('configuration'),
  classNames: ['article', 'item'],
  classNameBindings: ['isUnread'],

  articleImage: computed('article.body', function () {
    let body = $(get(this, 'article.body'));

    let img = $('img', body).first();
    let src = img.attr('src');

    if (!src) {
      src = 'img/no-image.jpg';
    }

    return src;

  }),

  excerpt: computed('article.body', function () {
    const stripAt = 120;
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

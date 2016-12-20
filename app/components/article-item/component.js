import Ember from "ember";

const {get, $, set, computed, observer, run, typeOf, inject} = Ember;

export default Ember.Component.extend({

  config: inject.service('configuration'),
  classNames: ['article', 'item'],
  classNameBindings: ['isUnread'],

  readOrUnread: computed('article.unread', function () {
    if (this.get('article.unread')) {
      return 'blue';
    }
    return 'grey';
  }),


  /**
   * some feeds add the content into the title tag, thats
   * why we do -this- thing here.
   */
  title: computed('article.title', function () {
    let title = this.get('article.title');

    return title;
  }),

  articleImage: computed('article.body', function () {
    let body = $(get(this, 'article.body'));

    let img = $('img', body).first();
    let src = img.attr('src');

    if (!src) {
      src = '/img/no-image.jpg';
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

  actions: {
    /**
     *
     * @param article
     */
    openArticle(article)
    {
      Ember.debug(`>>>> Feeds::openArticle(${article})`);
      this.get('app').transitionTo('feeds.show.items.show', article);
      // this.sendAction('onOpenArticle', article);

      $('#article-content-container').show();
    }
  }
})
;

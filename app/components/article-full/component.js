import Ember from "ember";

const {
  Component,
  get,
  $,
  computed,
  typeOf,
  inject
} = Ember;

export default Component.extend({


  meta: inject.service(),

  article: computed('meta.openItem', function () {
    return this.get('meta.openItem');
  }),

  config: inject.service('configuration'),

  showOriginalArticle: false,

  body: computed('article.body', function () {
    let body = this.get('article.body');
    if (body) {
      return body.htmlSafe();
    }

    return null;
  }),

  originalLabel: computed('showOriginalArticle', function () {
    if (this.get('showOriginalArticle')) {
      return 'Feed View';
    }

    return 'Open Original Article';
  }),

  classNames: [ 'ui', 'basic', 'segment', 'article-full' ],

  iframeWidth: computed(function () {
    const component = this.$();
    let currentWidth = $('.article-body', component).width();

    return currentWidth - (currentWidth / 100 * 10);

  }),

  doubleClick() {
    this.send('closeArticle', this.get('article'));
  },

  didRender() {

    Ember.debug('>>>> Enter article-full::didRender()');

    const article = get(this, 'article');

    if (get(article, 'unread')) {
      article.markRead();
    }
    const config = this.get('config', null);
    const articleSettings = config.retrieve('article_settings');
    // run.scheduleOnce('render', this, function () {

    const component = this.$();

    $('img, iframe, video', component).each(function () {

      const origWidth = typeOf($(this).attr('width')) !== 'undefined' ?
                        $(this).attr('width') :
                        $(this).width();

      const origHeight = typeOf($(this).attr('height')) !== 'undefined' ?
                         $(this).attr('height') :
                         $(this).height();

      const currentWidth = $('.article-body', component).width();

      if (this.nodeName.toLowerCase() === 'iframe') {

        if (origWidth > currentWidth) {

          const factor = origWidth / currentWidth;
          const scaledWidth = currentWidth;
          const scaledHeight = Math.round(origHeight / factor);

          $(this).attr('width', scaledWidth);
          $(this).attr('height', scaledHeight);
        }

        $(this).attr('sandbox', '');

        if (articleSettings && get(articleSettings, 'allowEmbedded') === true) {
          $(this).attr('sandbox', 'allow-same-origin allow-scripts');
        } else {
          const hint = 'Embedded content disabled: <a href="/settings">Enable in settings</a>';
          $(this).after('<div class="text-muted">' + hint + '</div>');
        }
      } else {
        if (origWidth > currentWidth) {
          $(this).addClass('ui adjust image');
        }
      }
    });
  },

  actions: {
    closeArticle(article) {
      Ember.debug(`ArticleFullComponent::closeArticle(${article})`);

      $('#article-content-container').removeClass('open');
    }
  }

});

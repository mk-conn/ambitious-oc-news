import Ember from 'ember';
import ArticleItem from '../article-item/component';

const {
  get,
  $,
  set,
  computed,
  observer,
  run,
  typeOf,
  inject
} = Ember;

export default ArticleItem.extend({
  config: inject.service('configuration'),

  showOriginalArticle: false,

  originalLabel: computed('showOriginalArticle', function() {
    if(this.get('showOriginalArticle')) {
      return 'Feed View';
    }

    return 'Open Original Article';
  }),

  classNames: ['ui', 'basic', 'segment'],

  iframeWidth: computed(function() {
    const component = this.$();
    let currentWidth = $('.article-body', component).width();

    return currentWidth - (currentWidth / 100 * 10);

  }),

  click() {
    Ember.debug('>>>> clicked in article-full');
  },

  didRender() {

    Ember.debug('>>>> Enter article-full::didRender()');

    const item = get(this, 'article');

    if (get(item, 'unread')) {
      item.markRead();
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

        Ember.debug('>>>> Original width,height:' + origWidth + ',' + origHeight);
        Ember.debug('>>>> Current width:' + currentWidth);


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
          $(this).addClass('ui fluid image');
        }
      }
    });
  }

});

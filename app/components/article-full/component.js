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

  classNames: ['ui', 'raised', 'segment'],

  click() {
    Ember.debug('>>>> clicked in article-full');
  },

  didRender() {
    const item = get(this, 'article');

    if (get(item, 'unread')) {
      item.markRead();
    }
    const config = this.get('config', null);
    const articleSettings = config.retrieve('article_settings');
    // run.scheduleOnce('render', this, function () {

      const component = this.$();

      $('img, iframe, video', component).each(function () {

        if (this.nodeName.toLowerCase() === 'iframe') {

          const origWidth = typeOf($(this).attr('width')) !== 'undefined' ? $(this).attr('width') : $(this).width();
          const origHeight = typeOf($(this).attr('height')) !== 'undefined' ? $(this).attr('height') : $(this).height();
          const currentWidth = $('.item-body', component).width();

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

          $(this).addClass('ui fluid image');

        }
      });
    // });
  }

});

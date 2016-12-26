import Ember from "ember";

const {get, $, set, computed, observer, run, typeOf, inject} = Ember;

export default Ember.Component.extend({
  config: inject.service('configuration'),

  classNames: [],

  color: computed('color', {
    get() {
      return this.get('color') || 'green';
    }
  }),

  showFull: false,

  articleOpen: observer('showFull', function () {
    const item = get(this, 'article');
    if (get(item, 'unread')) {
      item.markRead();
    }

    const config = this.get('config', null);
    const articleSettings = config.retrieve('article_settings');

    run.scheduleOnce('render', this, function () {

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
          $(this).addClass('img-fluid');
        }

      });
    });


  }),

  isUnread: computed('article.unread', {
    get() {
      return get(this, 'article.unread');
    },
    set(type, unread) {
      const item = get(this, 'article');
      if (unread === true) {
        item.markUnread();
      } else {
        item.markRead();
      }
    }
  }),

  isStarred: computed('article.starred', {
    get() {
      return get(this, 'article.starred');
    },
    set(type, star) {
      const item = get(this, 'article');

      if (star === true) {
        item.star();
      } else {
        item.unstar();
      }
    }
  }),

  starHint: computed('isStarred', function () {
    if (get(this, 'isStarred')) {
      return 'Unpin article';
    }
    return 'Pin article';
  }),

  openCloseHint: computed('showFull', function () {
    if (get(this, 'showFull')) {
      return 'Close article';
    }
    return 'Open article';
  }),

  readUnreadHint: computed('isUnread', function () {
    if (get(this, 'isUnread')) {
      return 'Mark read';
    }
    return 'Mark unread';
  }),

  actions: {
    openArticle() {
      Ember.debug('>>>> action "openArticle" called.');

      $('.ui.article.modal').modal('show');
      // this.sendAction('onOpenArticle', 'article', this.get('article'));
    },

    toggleShowFull() {
      this.toggleProperty('showFull');
    },

    toggleUnread() {
      this.toggleProperty('isUnread');
    },

    toggleStarred() {
      this.toggleProperty('isStarred');
    },

    originalArticle() {
      if (get(this, 'article.unread')) {
        get(this, 'article').markRead();
      }
    }

  }
});

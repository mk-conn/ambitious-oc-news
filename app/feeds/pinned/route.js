import Ember from "ember";

const {
  Route,
  get,
  set,
  RSVP,
  inject,
  $,
} = Ember;

export default Route.extend({
  gui: inject.service(),

  beforeModel() {
    $('#article-list-container').animate({scrollTop: 0, duration: 400});
    this.get('gui').activate('article-list');
  },

  /**
   *
   */
  model() {
    return this.store.query('item', {
      type: 2,
      getRead: true,
      oldestFirst: false
    });
  },
  /**
   *
   * @param model
   */
  afterModel(model) {

    let feed = Ember.Object.create({
      id: 'pinned',
      unreadCount: null,
      title: 'Pinned',
      url: '/feeds/pinned',
      folder: null
    });

    set(model, 'feed', feed);
  },
  /**
   *
   */
  renderTemplate()
  {
    this.render('feeds/pinned', {
      into: 'application',
      outlet: 'article-list'
    });
  },
  /**
   * Actions
   */
  actions: {

    willTransition() {
      // scroll to top

      this.get('gui').deactivate('article-list');
      this._super(...arguments);

    }

  }

});

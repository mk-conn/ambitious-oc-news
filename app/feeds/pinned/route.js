import Ember from "ember";

const {
  Route,
  get,
  set,
  RSVP
} = Ember;

export default Route.extend({
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
      outlet: 'main'
    });
  },
  /**
   * Actions
   */
  actions: {

  }

})
;

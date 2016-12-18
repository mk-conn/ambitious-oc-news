import Ember from "ember";

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('feed', params.feed_id);
  },

  /**
   *
   */
  renderTemplate() {
    this.render('feeds/edit', {
      into: 'application',
      outlet: 'main'
    });
  },

  actions: {

    renameFeed(title) {
      const feed = this.modelFor('feed');
      feed.rename();
    },

    updateUrl(url) {

    }
  }
});

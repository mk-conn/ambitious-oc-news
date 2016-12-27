import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";
import ActivateDeactivate from "ambitious-oc-news/mixins/activate-deactivate-view";

export default Ember.Route.extend(ActivateDeactivate, Protected, {

  display: {
    activate: 'content',
    deactivate: 'content'
  },

  model(params) {
    return this.store.findRecord('feed', params.feed_id);
  },


  /**
   *
   */
  renderTemplate() {
    this.render('feeds/edit', {
      into: 'application',
      outlet: 'content'
    });
  },

  actions: {

    renameFeed() {
      const feed = this.modelFor('feed');

      feed.rename();
    }
  }
});

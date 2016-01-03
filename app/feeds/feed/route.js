import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';

export default Ember.Route.extend(Protected, {
  model(params) {
    return this.store.peekRecord('feed', params.feed_id);
  },
  renderTemplate() {
    this.render('feeds/feed', {
      into: 'application',
      outlet: 'main'
    });
  }

});

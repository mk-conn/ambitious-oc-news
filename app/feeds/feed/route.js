import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';
import ResetToTop from 'ember-oc-news/mixins/reset-to-top';

const {Route, RSVP} = Ember;

export default Route.extend(Protected, ResetToTop, {
  model(params) {
    return this.store.peekRecord('feed', params.feed_id);
  },
  renderTemplate() {
    this.render('feeds/feed', {
      into: 'application',
      outlet: 'main'
    });
  },
  actions: {
    markRead(item) {
      console.log('route.js:markRead', item);
    }
  }

});

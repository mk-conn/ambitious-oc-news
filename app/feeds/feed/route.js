import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';
import ResetToTop from 'ambitious-oc-news/mixins/reset-to-top';

const {Route} = Ember;

export default Route.extend(Protected, ResetToTop, {
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

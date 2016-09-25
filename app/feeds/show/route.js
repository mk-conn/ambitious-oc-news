import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';
const {Route} = Ember;

export default Route.extend(Protected, {

  model(params) {
    return this.store.peekRecord('feed', params.feed_id);
  }
});

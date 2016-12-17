import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route
} = Ember;

export default Route.extend(Protected, {
  /**
   *
   * @param params
   * @returns {*|DS.Model|null}
   */
  model(params) {
    Ember.debug('>>>> Feeds.Show::model()')
    ;
    return this.store.findRecord('feed', params.feed_id);
  }

});

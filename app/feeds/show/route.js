import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  $,
  inject
} = Ember;

export default Route.extend(Protected, {

  gui: inject.service(),

  /**
   *
   * @param params
   * @returns {*|DS.Model|null}
   */
  model(params) {
    Ember.debug(`>>>> Feeds.Show::model(${params.feed_id})`);

    return this.store.peekRecord('feed', params.feed_id);
  },

});

import Ember from "ember";
import Protected from "nextfeeds/mixins/protected";

const {
  Route,
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
    Ember.debug(`>>>> feeds/show/route::model(${params.feed_id})`);

    return this.store.peekRecord('feed', params.feed_id);
  },

});

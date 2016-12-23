import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  RSVP,
  A,
  get
} = Ember;

export default Route.extend(Protected, {

  model() {

  },

  beforeModel() {

    this._super(...arguments);

  },

  afterModel() {
    this.transitionTo('feeds');

  }

});

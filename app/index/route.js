import Ember from "ember";
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  RSVP,
  A,
  get
} = Ember;

export default Route.extend(Protected, {

  markAllRead() {

  },


  beforeModel() {

    this._super(...arguments);

    this.transitionTo('feeds');
  }

});

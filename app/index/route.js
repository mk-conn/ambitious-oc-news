import Ember from "ember";
import Protected from "nextfeeds/mixins/protected";

const {
  Route,
} = Ember;

export default Route.extend(Protected, {

  afterModel() {
    this.transitionTo('feeds');
  }

});

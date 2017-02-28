import Ember from "ember";
import Protected from "nextfeed/mixins/protected";

const {
  Route,
} = Ember;

export default Route.extend(Protected, {

  afterModel() {
    this.transitionTo('feeds');
  }

});

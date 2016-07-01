/**
 * Created by mk on 29/06/16.
 */
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('folders');
  }
});

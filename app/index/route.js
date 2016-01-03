import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';

const {Route} = Ember;

export default Route.extend(Protected, {

  beforeModel()
  {
    this._super(...arguments);
    this.transitionTo('feeds');
  }
});

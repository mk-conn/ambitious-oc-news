import Ember from 'ember';
import Env from 'ambitious-oc-news/config/environment';
const {inject, get} = Ember;

export default Ember.Mixin.create({
  configuration: inject.service(),

  beforeModel() {
    const config = get(this, 'configuration');

    if(config.retrieve('oc_conn') === null) {
      this.transitionTo(Env.APP.DefaultLoginRoute);
    }

    this._super(...arguments);
  }
});

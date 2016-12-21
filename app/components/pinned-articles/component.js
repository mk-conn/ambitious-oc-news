import Ember from 'ember';

const {inject, get, computed} = Ember;

export default Ember.Component.extend({
  meta: inject.service(),

  starredCount: computed.alias('meta.starredCount'),
});

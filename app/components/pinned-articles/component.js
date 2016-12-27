import Ember from "ember";

const {
  inject,
  Component,
  computed
} = Ember;

export default Component.extend({
  meta: inject.service(),

  starredCount: computed.alias('meta.starredCount'),
});

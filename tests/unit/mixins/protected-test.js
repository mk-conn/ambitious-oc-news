import Ember from 'ember';
import ProtectedMixin from '../../../mixins/protected';
import { module, test } from 'qunit';

module('Unit | Mixin | protected');

// Replace this with your real tests.
test('it works', function(assert) {
  let ProtectedObject = Ember.Object.extend(ProtectedMixin);
  let subject = ProtectedObject.create();
  assert.ok(subject);
});

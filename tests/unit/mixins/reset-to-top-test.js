import Ember from 'ember';
import ResetToTopMixin from '../../../mixins/reset-to-top';
import { module, test } from 'qunit';

module('Unit | Mixin | reset to top');

// Replace this with your real tests.
test('it works', function(assert) {
  let ResetToTopObject = Ember.Object.extend(ResetToTopMixin);
  let subject = ResetToTopObject.create();
  assert.ok(subject);
});

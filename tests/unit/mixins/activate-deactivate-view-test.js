import Ember from 'ember';
import ActivateDeactivateViewMixin from 'nextfeeds/mixins/activate-deactivate-view';
import { module, test } from 'qunit';

module('Unit | Mixin | activate deactivate view');

// Replace this with your real tests.
test('it works', function(assert) {
  let ActivateDeactivateViewObject = Ember.Object.extend(ActivateDeactivateViewMixin);
  let subject = ActivateDeactivateViewObject.create();
  assert.ok(subject);
});

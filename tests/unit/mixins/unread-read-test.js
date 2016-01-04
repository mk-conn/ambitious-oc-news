import Ember from 'ember';
import UnreadReadMixin from '../../../mixins/unread-read';
import { module, test } from 'qunit';

module('Unit | Mixin | unread read');

// Replace this with your real tests.
test('it works', function(assert) {
  let UnreadReadObject = Ember.Object.extend(UnreadReadMixin);
  let subject = UnreadReadObject.create();
  assert.ok(subject);
});

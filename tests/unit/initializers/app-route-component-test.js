import Ember from 'ember';
import AppRouteComponentInitializer from '../../../initializers/app-route-component';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | app route component', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AppRouteComponentInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

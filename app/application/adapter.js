import DS from 'ember-data';
import Ember from 'ember';
import Env from 'ember-oc-news/config/environment';

const {
  inject, get
  } = Ember;

export default DS.RESTAdapter.extend({
  //session: inject.service(),
  configuration: inject.service(),
  //host: function () {
  //  const session = get(this, 'session');
  //  return session.get('data.domain');
  //}.property(),
  host: Ember.computed(function () {
    const config = get(this, 'configuration').retrieve();
    return config.domain;
  }).volatile(),
  headers: Ember.computed(function () {
    const config = get(this, 'configuration').retrieve();
    const auth = btoa(config.username + ':' + config.password);

    return {
      Authorization: 'Basic ' + auth
    };

  }).volatile(),
  namespace: Env.APP.OCAPIRootPath,
  authorizer: 'authorizer:oc'
});

import DS from "ember-data";
import Ember from "ember";
import Env from "ambitious-oc-news/config/environment";
//import UrlTemplates from 'ember-data-url-templates';

const {
  inject, get, computed
} = Ember;

export default DS.RESTAdapter.extend({
  configuration: inject.service(),
  updateRecordUrlTemplate: computed(function () {
    const url = get(this, 'host') + '/' + get(this, 'namespace') + '{+updateEndpoint}';

    return url;
  }),
  urlSegments: {

    updateEndpoint(type, id, snapshot) {
      const endpoint = get(snapshot.record, '_updateEndpoint');

      return endpoint;
    }

  },
  host: Ember.computed(function () {
    const config = get(this, 'configuration').retrieve('oc_conn');
    if (config) {
      return config.domain;
    }

    return null;
  }).volatile(),
  headers: Ember.computed(function () {
    const config = get(this, 'configuration').retrieve('oc_conn');
    if (config) {

      const auth = btoa(config.username + ':' + config.password);

      return {
        Authorization: 'Basic ' + auth
      };
    }

  }).volatile(),
  namespace: Env.APP.OCAPIRootPath,
  authorizer: 'authorizer:oc',

  updateRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot);

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');
    var verb = get(snapshot.record, '_updateVerb') || "PUT";

    return this.ajax(url, verb, {data: data});
  }
});

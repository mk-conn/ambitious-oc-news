import Ember from 'ember';
import ApplicationAdapter from 'ember-oc-news/application/adapter';
import UrlTemplates from 'ember-data-url-templates';

const {get, computed} = Ember;

export default ApplicationAdapter.extend(UrlTemplates, {

  updateRecord(store, type, snapshot) {

    var id = snapshot.id;

    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');
    var verb = get(snapshot, 'record._updateVerb') || "PUT";
    if (url.match(/.*read$/)) {
      const newestItemId = get(snapshot.record, 'newestItemId');
      return this.ajax(url, verb, {data: {newestItemId: newestItemId}});
    }

    return this._super(store, type, snapshot);
  }
});

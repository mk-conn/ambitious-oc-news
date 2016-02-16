import Ember from 'ember';
import ApplicationAdapter from 'ambitious-oc-news/application/adapter';
import UrlTemplates from 'ember-data-url-templates';

const {get, inject} = Ember;

export default ApplicationAdapter.extend(UrlTemplates, {
  meta: inject.service(),
  updateRecord(store, type, snapshot) {

    var id = snapshot.id;

    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');
    var verb = get(snapshot, 'record._updateVerb') || "PUT";

    if (url.match(/.*read$/)) {
      return this.ajax(url, verb, {data: {newestItemId: get(this, 'meta.newestItemId')}});
    }

    if (url.match(/.*rename$/)) {
      const feedTitle = get(snapshot.record, 'title');
      return this.ajax(url, verb, {data: {feedTitle: feedTitle}});
    }

    return this._super(store, type, snapshot);
  },
  createRecord(store, type, snapshot) {

    var id = snapshot.id;

    var url = this.buildURL(type.modelName, id, snapshot, 'createRecord');
    var data = {
      url: get(snapshot.record, 'url'),
      folderId: get(snapshot.record, 'folderId')
    };

    return this.ajax(url, 'POST', {data: data});
  }
});

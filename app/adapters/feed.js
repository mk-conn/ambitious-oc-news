import Ember from 'ember';
import ApplicationAdapter from 'ambitious-oc-news/application/adapter';
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

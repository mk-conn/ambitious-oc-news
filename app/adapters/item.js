import Ember from "ember";
import ApplicationAdapter from "ambitious-oc-news/application/adapter";
import UrlTemplates from "ember-data-url-templates";

const {get} = Ember;

export default ApplicationAdapter.extend(UrlTemplates, {
  updateRecord(store, type, snapshot) {

    var id = snapshot.id;

    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');
    var verb = get(snapshot, 'record._updateVerb') || "PUT";
    //console.log('item.js:updateRecord', );
    if (url.match(/.*read$/) || url.match(/.*unread$/)) {
      return this.ajax(url, verb, {data: {type: 'item'}});
    }

    return this._super(store, type, snapshot);

  }
});

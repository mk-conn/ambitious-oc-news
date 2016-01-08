import Ember from 'ember';
import ApplicationAdapter from 'ember-oc-news/application/adapter';
import UrlTemplates from 'ember-data-url-templates';

const {get, computed} = Ember;

export default ApplicationAdapter.extend(UrlTemplates, {

  updateRecordUrlTemplate: computed(function () {

    const url = get(this, 'host') + '/' + get(this, 'namespace') + '{/updateEndpoint}';

    return url;
  }),
  urlSegments: {
    updateEndpoint(type, id, snapshot) {
      const endpoint = get(snapshot.record, '_updateEndpoint');
      return endpoint;
    }
  }
});

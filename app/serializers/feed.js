import DS from 'ember-data';
import Ember from 'ember';

const {
  inject,
  set, get
} = Ember;

export default DS.RESTSerializer.extend({

  meta: inject.service(),

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    if (payload && payload.feeds) {
      console.log(':', 'serializer,feed');
      const meta = get(this, 'meta');
      set(meta, 'newestItemId', payload.newestItemId);
      set(meta, 'starredCount', payload.starredCount);

      delete payload.newestItemId;
      delete payload.starredCount;
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }

});

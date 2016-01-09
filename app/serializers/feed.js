import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload && payload.feeds) {
      payload.feeds.forEach(feed => {
        feed.newestItemId = payload.newestItemId;
      });
      delete payload.newestItemId;
      delete payload.starredCount;
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});

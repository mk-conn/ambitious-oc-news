import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';

const {Route, RSVP, get, A} = Ember;

export default Route.extend(Protected, {
  beforeModel()
  {

  },
  model() {
    let promises = {
      folders: this.store.findAll('folder'),
      feeds: this.store.findAll('feed'),
      items: this.store.findAll('item')
    };

    // just load everthing into the store, so sub routes will just peek records instead of fetching them
    return RSVP.hash(promises).then(hash => {

      return {
        feeds: hash.feeds,
        folders: this.store.peekAll('folder'),
        items: hash.items
      };

    });
  },
  afterModel() {
    this._super(...arguments);
    this.transitionTo('feeds');
  }
});

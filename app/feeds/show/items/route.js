import Ember from 'ember';
import ENV from 'ambitious-oc-news/config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

const {get} = Ember;

export default Ember.Route.extend(InfinityRoute, {

  model() {
    Ember.debug('items-route');
    const feed = this.modelFor('feeds/show');
    console.log('feed(modelfor):', feed.id);
    const batchSize = ENV.APP.items.batchSize || 10;

    return this.infinityModel('item', {
        batchSize: batchSize,
        type: 0,
        id: get(feed, 'id'),
        getRead: true,
        oldestFirst: false
      },
      {
        offset: '_offset'
      });
  },
  renderTemplate() {
    this.render('feeds/show/items', {
      into: 'application',
      outlet: 'main'
    });
  }
});

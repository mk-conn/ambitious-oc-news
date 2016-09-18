import Ember from 'ember';
import ENV from 'ambitious-oc-news/config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

const {get} = Ember;

export default Ember.Route.extend(InfinityRoute, {
  model() {
    const feed = this.modelFor('feeds.feed');
    const batchSize = ENV.APP.items.batchSize || 10;

    return this.infinityModel('item', {
      batchSize: batchSize,
      type: 0,
      id: get(feed, 'id'),
      getRead: true,
      oldestFirst: false
    }, {
      offset: '_offset'
    });
  },
  renderTemplate() {
    this.render('feeds/feed/articles', {
      into: 'application',
      outlet: 'main'
    });
  }
});

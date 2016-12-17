import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';
const {Route} = Ember;

export default Route.extend(Protected, {

  actions: {

    deleteFeed(feed) {
      Ember.debug('>>>> feeds::deleteFeed()');

      feed.deleteRecord();

      if (feed.get('isDeleted')) {
        feed.save().then(() => {
          this.transitionTo('index');
        });
      }
    },

    markAllArticlesAsRead(feed) {
      Ember.debug('>>>> feeds::markAllArticlesAsRead()');

      feed.markAllItemsRead();

    }
  }

});

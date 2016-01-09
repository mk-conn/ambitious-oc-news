import Ember from 'ember';
import Protected from 'ember-oc-news/mixins/protected';
const {A, RSVP, get} = Ember;

export default Ember.Route.extend(Protected, {
   model() {

    let promises = {
      folders: this.store.findAll('folder'),
      feeds: this.store.findAll('feed')
    };

    let unfoldered = new A();

    return RSVP.hash(promises).then(hash => {

      hash.feeds.forEach(feed => {
        let folder = this.store.peekRecord('folder', get(feed, 'folderId'));

        if (folder) {
          folder.get('feeds').addObject(feed);
        } else {
          unfoldered.addObject(feed);
        }
      });

      return {
        feeds: hash.feeds,
        unfoldered: unfoldered,
        folders: this.store.peekAll('folder'),
        //items: hash.items,
        //starred: hash.items.filterBy('starred', true)
      };

    });
  }
});

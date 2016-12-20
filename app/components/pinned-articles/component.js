import Ember from 'ember';
import Counting from 'ambitious-oc-news/mixins/unread-read';

const {inject, get, computed} = Ember;

export default Ember.Component.extend(Counting, {
  meta: inject.service(),

  starredCount: computed.alias('meta.starredCount'),
});

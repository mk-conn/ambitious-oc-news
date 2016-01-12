import Ember from 'ember';

const {Component, get, set, computed} = Ember;

export default Component.extend({
  tagName: 'form',
  focusOut() {

    get(this, 'feed').renameFeed().then(() => {
      this.attrs.stopEditing();
    }, error => {
      throw error;
    });
  },
  submit() {
    return false;
  }
});

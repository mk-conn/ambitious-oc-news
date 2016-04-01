import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  filterFolders: Ember.computed.mapBy('folders', 'name'),
  selected: Ember.computed({
    get() {

    },
    set(type, folder) {
      return folder;
    }
  }),
  actions: {
    submit() {

      if (get(this, 'selected')) {
        get(this, 'feed').set('folder', get(this, 'selected'));
      }

      this.sendAction('submit', get(this, 'feed'));
    },
    handleKeydown(dropdown, e) {
      if (e.keyCode !== 13) {
        return;
      }

      let value = e.target.value;

      if (value) {
        const folder = this.attrs.createFolder(value);
        this.set('selected', folder);
      }
    }

  }
});

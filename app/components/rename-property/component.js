import Ember from 'ember';

const {Component, get, set, computed,$,observer, run} = Ember;

const KEY_ESC = 27;
const KEY_ENTER = 13;


export default Component.extend({
  tagName: 'div',
  isEditing: false,
  hint: 'Rename',
  value: computed.alias('model', 'property', function () {
    return get(this, 'model').get(get(this, 'property'));
  }),
  setFocus: observer('isEditing', function () {
    if (get(this, 'isEditing')) {

      run.scheduleOnce('afterRender', this, function () {
        $('input#rename-property').focus();
      });
    }
  }),
  hasChanged: computed('model.hasDirtyAttributes', function () {
    if (get(this, 'model.hasDirtyAttributes')) {
      return true;
    }
    return false;
  }),
  keyUp(evt) {
    if (evt.keyCode !== KEY_ESC) {
      return;
    }
    this.send('cancel');
  },
  focusOut() {
    if (get(this, 'hasChanged')) {
      this.send('rename');
    }
  },

  actions: {
    rename() {
      const renameFunction = get(this, 'renameFunction');
      if (get(this, 'value')) {

        get(this, 'model')[renameFunction]().then(() => {
          set(this, 'isEditing', false);
        }, error => {
          throw error;
        });
      }
    },
    cancel() {
      set(this, 'isEditing', false);
      if (get(this, 'hasChanged')) {
        set(this, 'value', get(this, 'model').get(get(this, 'property')));
      }
    },
    submit() {
      this.send('rename');
    }
  }
});

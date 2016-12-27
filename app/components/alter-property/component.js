import Ember from "ember";

const {
  Component,
  get,
  set,
  computed,
} = Ember;

const KEY_ESC = 27;

export default Component.extend({
  tagName: 'div',
  isEditing: false,
  value: computed.alias('model', 'property', function () {
    return get(this, 'model').get(get(this, 'property'));
  }),
  // setFocus: observer('isEditing', function () {
  //   if (get(this, 'isEditing')) {
  //
  //     run.scheduleOnce('afterRender', this, function () {
  //       $('input#rename-property').focus();
  //     });
  //   }
  // }),
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
  actions: {
    rename() {
      const model = this.attrs.model.value;
      const onUpdate = this.attrs.onUpdate;

      if (get(this, 'value')) {

        model[ onUpdate ]().then(() => {
          set(this, 'isEditing', false);
        }, error => {
          throw error;
        });
      }
    },
    cancel() {
      set(this, 'isEditing', false);

      if (get(this, 'hasChanged')) {
        const model = this.attrs.model.value;
        model.rollbackAttributes();
      }
    },
    submit() {
      this.send('rename');
    }
  }
});

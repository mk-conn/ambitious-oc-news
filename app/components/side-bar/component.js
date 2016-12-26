import Ember from "ember";

const {
  Component
} = Ember;

export default Component.extend({
  classNames: [ 'ui', 'visible', 'sidebar', 'inverted', 'vertical', 'left', 'menu' ],

  didInsertElement() {
    this._super(...arguments);

    // this.$().sidebar('attach events', `#${this.get('elementId')} .item`);
    this.$().sidebar({
      context: `#${this.get('side-bar-context')}`
    });
  }
});

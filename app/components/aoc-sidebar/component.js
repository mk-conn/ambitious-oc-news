import Ember from 'ember';
import UiSidebar from 'semantic-ui-ember/components/ui-sidebar';

const {
  $
} = Ember;

export default UiSidebar.extend({

  ui_context: 'body.ember-application > div.ember-view:first-child',

  didInsertElement() {

    $(this.get('ui_context')).addClass('pushable');

    this._super(...arguments);

    this.$().sidebar('attach events', `#${this.get('elementId')} .item`);
  }
});

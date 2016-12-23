import Ember from "ember";

const {
  Service,
  $,
  A
} = Ember;

/**
 * Cares for all the open and close parts of the
 * application
 */
export default Service.extend({

  active: new A(),
  /**
   *
   * @param layoutComponent
   */
  activate(layoutComponent) {
    Ember.debug(`>>>> GuiService::activate(${layoutComponent})`);

    if (!$(`#${layoutComponent}`).hasClass('activated')) {
      $(`#${layoutComponent}`).addClass('activated');
    }

  },
  /**
   *
   * @param layoutComponent
   */
  deactivate(layoutComponent) {
    Ember.debug(`>>>> GuiService::deactivate(${layoutComponent})`);
    $(`#${layoutComponent}`).removeClass('activated');
  }

});

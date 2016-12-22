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
    $(`#${layoutComponent}`).addClass('activated');

    // this.get('active').push(layoutComponent);
  },
  /**
   *
   * @param layoutComponent
   */
  deactivate(layoutComponent) {
    $(`#${layoutComponent}`).removeClass('activated');

    // this.get('active').remove(layoutComponent);
  }

});

import Ember from "ember";
import UiSticky from "semantic-ui-ember/components/ui-sticky";

const {
  $
} = Ember;

export default UiSticky.extend({

  didInsertElement() {
    let element = $('#' + this.get('elementId'));

    $(element).sticky({
      context: '#article-content-container',
      pushing: true
    });
  }

});

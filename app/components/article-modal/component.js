import UiModal from 'semantic-ui-ember/components/ui-modal';
import Ember from 'ember';

const {
  get,
  computed,
  $
} = Ember;

export default UiModal.extend({
  name: 'article',
  classNames: ['article full'],

  body: computed('article.body', function () {
    return get(this, 'article.body').htmlSafe();
  }),

  didInsertElement() {
    Ember.debug('>>>> Article Modal: didInsertElement');

    $('.ui.article.modal').modal('show');
  }

});

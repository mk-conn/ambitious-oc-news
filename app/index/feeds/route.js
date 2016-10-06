import Ember from 'ember';
import Protected from 'ambitious-oc-news/mixins/protected';

const {
  Route,
  RSVP,
  A,
  get
} = Ember;

export default Route.extend(Protected, {

  renderTemplate() {
    this.render('index/feeds', {
      into: 'application',
      outlet: 'main'
    });
  }

});

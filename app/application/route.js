import Ember from "ember";
// import ENV from 'ambitious-oc-news/config/environment';
import Protected from "ambitious-oc-news/mixins/protected";

const {
  Route,
  get,
  inject,
  $
} = Ember;

export default Route.extend(Protected, {

  moment: inject.service(),
  config: inject.service('configuration'),

  beforeModel() {
    this._super(...arguments);

    var lang = (navigator.language || navigator.browserLanguage).split('-')[0];
    this.get('moment').changeLocale(lang);

  },

  actions: {
    willTransition(){

      console.log('routename:', this.routeName);
      console.log('currentRouteName:', this.get('currentRouteName'));

      this.controllerFor('application').set('lastRoute', this.routeName);
    },

    openArticle(article) {
      Ember.debug(`ApplicationsRoute::openArticle(${article})`);

      // this.get('meta').set('openItem', article);
      this.render('article', {
          into: 'application',
          outlet: 'article-content',
          model: article
        }
      );
    },

    goBack() {
      const history = window.history;
      if (history.length) {
        window.history.back();
      } else {
        this.transition('feeds');
      }
    },

    closeArticle() {
      Ember.debug(`>>>> ApplicationRoute::closeArticle()`);
      $('#article-content-container').removeClass('open');
    },

    transition(route, model) {
      Ember.debug(`>>>> AppRoute::transition('${route}, ${model}`);

      this.transitionTo(route, model);
    },
  }

});

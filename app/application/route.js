import Ember from "ember";
// import ENV from 'nextfeed/config/environment';
import Protected from "nextfeed/mixins/protected";

const {
    Route,
    inject,
    $
} = Ember;

export default Route.extend(Protected, {

    moment: inject.service(),
    config: inject.service('configuration'),

    beforeModel() {
        this._super(...arguments);

        let lang = (navigator.language || navigator.browserLanguage).split('-')[ 0 ];
        this.get('moment').changeLocale(lang);
    },

    actions: {

        openArticle(article) {
            Ember.debug(`route: application::openArticle(${article})`);

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
            Ember.debug(`route: application::closeArticle()`);
            $('#article-content-container').removeClass('open');
        },

        transition(route, model) {
            Ember.debug(`route: application::actions::transition('${route}, ${model}`);

            this.transitionTo(route, model);
        },
    }

});

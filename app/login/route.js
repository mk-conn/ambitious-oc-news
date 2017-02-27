import Ember from "ember";
import Env from "nextfeeds/config/environment";
import ActivateDeactivate from 'nextfeeds/mixins/activate-deactivate-view';

const {
    Route,
    inject,
    get,
    set
} = Ember;


export default Route.extend(ActivateDeactivate, {

    display: {
        activate: 'content',
        deactivate: 'content'
    },

    configuration: inject.service(),
    auth: inject.service(),

    beforeModel() {

        Ember.debug(`route: login::beforeModel() `);

        const config = get(this, 'configuration');
        if (config.retrieve('oc_conn')) {
            this.transitionTo(Env.APP.DefaultRouteAfterLogin);
        }
    },

    model() {

        Ember.debug(`route: login::model() `);

        return Ember.Object.create({
            username: null,
            password: null,
            domain: null,
            persist: false
        });
    },

    renderTemplate() {
        Ember.debug(`route: login::renderTemplate() `);

        return this.render('login', {
            into: 'application',
            outlet: 'content'
        });

    },

    actions: {

        authenticate() {
            let model = get(this, 'currentModel');
            let {domain, username, password, persist} = model.getProperties('domain', 'username', 'password', 'persist');

            const auth = get(this, 'auth');

            const options = {
                username: username,
                password: password,
                persist: persist,
                domain: domain
            };

            auth.authorize(options).then((success) => {
                set(model, 'success', success + '<p>You are now being redirected to feeds - this may take a while</p>'.htmlSafe());
                this.transitionTo(Env.APP.DefaultRouteAfterLogin);
            }, error => {
                set(model, 'error', error);
            });

            return false;
        }
    }
});

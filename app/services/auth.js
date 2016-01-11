import Ember from 'ember';
import Env from 'ambitious-oc-news/config/environment';

const {RSVP, get, set, $ : {ajax}, inject, Service, run} = Ember;

export default Service.extend({
  configuration: inject.service(),
  authorize(options) {
    const url = options.domain + '/' + Env.APP.OCAPIRootPath + '/version';

    return new RSVP.Promise((resolve, reject) => {
      ajax({
        url: url,
        type: 'GET',
        contentType: "application/json, text/javascript; q=0.01",
        dataType: 'json',

        beforeSend: (xhr)  => {
          const auth = btoa(options.username + ':' + options.password);
          xhr.setRequestHeader('Authorization', 'Basic ' + auth);
        }
      }).then(response => {
        run(() => {
          const crypt = true;
          if (options.persist) {
            get(this, 'configuration').store('oc_conn', JSON.stringify(options), 'local', crypt);

          } else {
            get(this, 'configuration').store('oc_conn', JSON.stringify(options), 'session', crypt);
          }
          resolve('Connected to Owncloud News version: ' + response.version);
        });

      }, (xhr, status, error) => {
        var reason = error + ' (' + status + ')';
        run(function () {
          reject(reason);
        });
      });
    });
  }
});

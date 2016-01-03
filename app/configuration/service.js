import Ember from 'ember';
import Env from 'ember-oc-news/config/environment';
const {
  RSVP,
  Service,
  $ : {ajax},
  run,
  set,
  get
  } = Ember;


export default Service.extend({
  error: '',
  /**
   *
   * @returns {null}|{Object}
   */
  retrieve() {
    let config = localStorage.getItem('oc_news_configuration') || sessionStorage.getItem('oc_news_configuration');

    if (config) {
      return JSON.parse(config);
    }

    return null;
  },
  /**
   *
   * @param {Object} options
   */
  save(options)
  {
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
        run(function () {
          if (options.persist) {
            localStorage.setItem('oc_news_configuration', JSON.stringify(options));
          } else {
            sessionStorage.setItem('oc_news_configuration', JSON.stringify(options));
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

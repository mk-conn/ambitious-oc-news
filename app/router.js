import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  // this.route('feeds', {path: 'feeds'}, function () {
  //   this.route('index', {path: '/'});
  //   this.route('single', {path: '/:id'});
  //
  //   this.route('articles', function () {
  //     this.route('starred');
  //     this.route('all');
  //   });
  // });

  this.route('login');
  this.route('settings');

  this.route('feeds', {path: 'feeds'}, function () {
    this.route('feed', {path: 'feed/:feed_id'}, function () {
      this.route('articles', {path: '/articles'});
    });
  });

});

export default Router;

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {

  this.route('feeds', {path: '/feeds'}, function () {
    this.route('show', {path: '/:feed_id'}, function () {
      this.route('items', {path: '/items'}, function () {
      });
    });
  });

  this.route('login');
  this.route('settings', {path: '/settings'}, function () {
  });

});

export default Router;

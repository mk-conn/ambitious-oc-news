import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('feeds', {path: 'feeds'}, function () {
    this.route('feed', {path: '/feed/:feed_id'});
    this.route('starred');
    this.route('all');
  });

  this.route('login');
  this.route('settings');

  this.route('items', function() {
    this.route('starred');
  });
});

export default Router;

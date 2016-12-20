import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {

  this.route('feeds', {path: '/feeds'}, function () {
    this.route('show', {path: '/:feed_id'}, function () {
      this.route('items', {path: '/items'}, function () {
        this.route('show', {path: '/:id'});
      });
    });
    this.route('edit', {path: '/edit/:feed_id'}, function () {
    });
    this.route('pinned', function() {
      this.route('show', function() {
        this.route('item');
      });
    });
  });

  this.route('login', {path: '/login'}, function () {
  });
  this.route('settings', {path: '/settings'}, function () {
  });

  this.route('feed', {path: '/feed/:feed_id'}, function () {
  });
});

export default Router;

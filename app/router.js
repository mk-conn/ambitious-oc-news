import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('feeds', {path: '/feeds'}, function () {

    this.route('show', {path: '/:feed_id'}, function () {
      this.route('articles', {path: '/articles'}, function () {
        this.route('show', {path: '/:id'});
      });
    });

    this.route('edit', {path: '/edit/:feed_id'}, function () {
    });

    this.route('pinned', function () {
      this.route('show', function () {
        this.route('article', {path: '/:article_id'});
      });
    });
  });

  this.route('login', {path: '/login'}, function () {
  });
  this.route('settings', {path: '/settings'}, function () {
  });

  this.route('feed', {path: '/feed/:feed_id'}, function () {
  });

  this.route('folder', function () {
    this.route('edit', {path: '/edit/:folder_id'});
  });
});

export default Router;

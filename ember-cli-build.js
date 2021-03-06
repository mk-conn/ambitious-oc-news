/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
// var Funnel = require('broccoli-funnel');

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {
        // Add options here
        sourcemaps: {enabled: true},
        fingerprint: {
            exclude: [
                'apple-touch-icon.png',
                'apple-touch-icon-57x57.png',
                'apple-touch-icon-72x72.png',
                'apple-touch-icon-76x76.png',
                'apple-touch-icon-114x114.png',
                'apple-touch-icon-120x120.png',
                'apple-touch-icon-144x144.png',
                'apple-touch-icon-152x152.png',
                'apple-touch-icon-180x180.png'
            ]
        }
    });

    // var extraAssets = new Funnel('bower_components/font-awesome/fonts', {
    //   srcDir: '/',
    //   include: ['*'],
    //   destDir: '/fonts'
    // });

    app.import('bower_components/fastclick/lib/fastclick.js');

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    // return app.toTree(extraAssets);
    return app.toTree();
};

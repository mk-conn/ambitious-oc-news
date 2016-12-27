import Ember from "ember";

const {
  run : {
    schedule
  }
} = Ember;

export function initialize(/* application */) {
  schedule('afterRender', function () {
    FastClick.attach(document.body); // jshint ignore:line
  });
}

export default {
  name: 'fastclick',
  initialize
};

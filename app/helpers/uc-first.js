import Ember from "ember";
const {Helper} = Ember;

export default Helper.extend({
  compute([string]) {
    return string[0].toUpperCase() + string.slice(1);
  }
});

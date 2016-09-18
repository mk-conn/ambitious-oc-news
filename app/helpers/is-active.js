import Ember from 'ember';
const { Helper } = Ember;

export default Helper.extend({
  compute([routeName, activeRoute]) {
    console.log('is-active:', routeName, activeRoute);
    return activeRoute === routeName;
  }
});

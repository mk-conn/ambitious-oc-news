import Ember from "ember";

const {
  Service
} = Ember

export default Service.extend({
  newestItemId: null,
  starredCount: null,
  openItem: 'test'
});

import DS from "ember-data";

export default DS.RESTSerializer.extend({

  keyForRelationship(key) {
    return key + 'Id';
  }
});

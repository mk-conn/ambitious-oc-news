import DS from "ember-data";

export default DS.RESTSerializer.extend({

  keyForRelationship(key, relationship, method) {
    return key + 'Id';
  }
});

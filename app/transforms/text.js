import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized.replace(/\\n/g, "\n");
  },

  serialize(deserialized) {
    return deserialized;
  }
});

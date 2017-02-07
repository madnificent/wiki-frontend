import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('text'),
  topics: DS.hasMany('topic', { inverse: "articles" }),
});

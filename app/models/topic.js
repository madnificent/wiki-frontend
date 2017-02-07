import DS from 'ember-data';

export default DS.Model.extend({
  articles: DS.hasMany('article', { inverse: "topics" }),
  title: DS.attr('string')
});

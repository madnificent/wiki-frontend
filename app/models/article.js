import DS from 'ember-data';

export default DS.Model.extend({
  headline: DS.attr('string'),
  body: DS.attr('string')
});

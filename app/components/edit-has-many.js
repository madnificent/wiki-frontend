import Ember from 'ember';
import dynamicAlias from 'ember-dynamic-alias';

export default Ember.Component.extend({
  selectableTopics: [],
  relationship: 'model.topics',
  linkType: 'topic',
  store: Ember.inject.service('store'),
  selectedTopics: [],
  topicsAliasThing: dynamicAlias('relationship', 'selectedTopics'),
  selectizeTopics: Ember.computed( 'selectableTopics.[]', 'selectedtopics.@each.title', 'selectedTopics.[]', 'selectableTopics.@each.title', function() {
    const selectableTopics = this.get('selectableTopics') || [];
    const selectedTopics = this.get('selectedTopics') || [];
    const selectizeTopics = Ember.A();
    selectableTopics.map( (topic) => selectizeTopics.push( topic ) );
    selectedTopics.map( (topic) => selectizeTopics.push( topic ) );
    return selectizeTopics;
  }),
  actions: {
    filterChanged(searchString) {
      type = this.get('modelType')
      this.get('store').query(type, { filter: searchString }).then(
        (topics) => this.set('selectableTopics', topics)
      );
    },
    newTopic( string ) {
      const record = this.get('store').createRecord('topic', {
        title: string,
        articles: [this.get('model')]
      });
      record.save().then(
        (topic) => this.get('selectedTopics').pushObject(topic)
      );
    }
  }
});

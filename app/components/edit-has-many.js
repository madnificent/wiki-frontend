import Ember from 'ember';

export default Ember.Component.extend({
  selectableTopics: [],
  selectedTopics: Ember.computed.alias('model.topics'),
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
      this.get('store').query('topic', { filter: searchString }).then(
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


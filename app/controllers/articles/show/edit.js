import Ember from 'ember';

export default Ember.Controller.extend({
  selectableTopics: [],
  selectedTopics: Ember.computed.alias('model.topics'),
  actions: {
    save: function() {
      this.get('model').save().then(
        () => this.transitionToRoute("articles.show", this.get('model'))
      );
    },
    togglePreview() {
      this.toggleProperty('render-preview');
    }
  }
});

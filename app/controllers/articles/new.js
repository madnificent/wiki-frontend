import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create() {
      const record = this.get('store').createRecord("article", {
        title: this.get('model.title'),
        body: this.get('model.body')
      });

      record.save().then(
        (model) =>
          this.transitionToRoute("articles.show", model)
      );
    },
    togglePreview() {
      this.toggleProperty('render-preview');
    }
  }
});

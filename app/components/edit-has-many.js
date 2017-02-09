import Ember from 'ember';
import dynamicAlias from 'ember-dynamic-alias';

export default Ember.Component.extend({
  selectableItems: [],
  relationship: 'items',
  relationshipPath: Ember.computed( 'relationship', function() {
    const relationship = this.get('relationship');
    if( relationship ){
      return `model.${relationship}`;
    }
  }),
  linkedModelType: 'item',
  shownAttribute: 'title',
  optionLabelPath: Ember.computed( 'shownAttribute', function() {
    return `content.${this.get('shownAttribute')}`;
  }),
  placeholder: Ember.computed('relationship', function() {
    return `Select some ${this.get('relationship')}`;
  }),
  store: Ember.inject.service('store'),
  selectedItems: [],
  dynamicItemsAlias: dynamicAlias('relationshipPath', 'selectedItems'),
  selectizeItems: Ember.computed( 'selectedItems.@each.title', 'selectableItems.@each.title', function() {
    const selectableItems = this.get('selectableItems') || [];
    const selectedItems = this.get('selectedItems') || [];
    const selectizeItems = Ember.A();
    selectableItems.map( (item) => selectizeItems.push( item ) );
    selectedItems.map( (item) => selectizeItems.push( item ) );
    return selectizeItems;
  }),
  actions: {
    filterChanged(searchString) {
      const type = this.get('linkedModelType');
      this.get('store').query(type, { filter: searchString }).then(
        (items) => this.set('selectableItems', items)
      );
    },
    newItem( string ) {
      const type = this.get('linkedModelType');
      const attr = this.get('shownAttribute');
      const properties = {};
      properties[attr] = string;

      const record = this.get('store').createRecord( type, properties );
      
      record.save().then(
        () => this.get('selectedItems').pushObject( record )
      );
    }
  }
});

import { moduleFor, test } from 'ember-qunit';

moduleFor('route:articles/new', 'Unit | Route | articles/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

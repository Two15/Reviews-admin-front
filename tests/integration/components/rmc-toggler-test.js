import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rmc-toggler', 'Integration | Component | rmc toggler', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('repo', {});
  this.render(hbs`{{rmc-toggler repository=repo}}`);

  assert.ok(true, 'it did not break');
});

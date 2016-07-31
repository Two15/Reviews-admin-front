import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rmc-toggler', 'Integration | Component | rmc toggler', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rmc-toggler}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rmc-toggler}}
      template block text
    {{/rmc-toggler}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

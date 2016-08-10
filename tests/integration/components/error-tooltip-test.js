import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-tooltip', 'Integration | Component | error tooltip', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{error-tooltip target=true}}`);

  assert.ok(true);

});

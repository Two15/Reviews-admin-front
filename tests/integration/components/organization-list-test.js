import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organization-list', 'Integration | Component | organization list', {
  integration: true
});

test('it renders', function(assert) {
  this.set('mockUser', {
    uid: '1234',
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    avatar_url: 'fake/path.png',
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    name: 'my name'
  });

  this.render(hbs`{{organization-list me=mockUser}}`);

  assert.equal(this.$().text().trim(), '');
});

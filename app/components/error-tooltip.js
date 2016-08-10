import Ember from 'ember';

const {
  assert,
  Component,
  computed
} = Ember;

export default Component.extend({
  visible: false,
  target: computed(function() {
    assert('You must specify a target', false);
  })
});

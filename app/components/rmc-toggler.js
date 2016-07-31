import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  ajax: service(),
  repository: null,
  status: computed('repository', {
    get() {
      return this.get('ajax').repositoryStatus(this.get('repository'));
    }
  }).readOnly(),
  actions: {
    enable() {
      return this.get('ajax').enable(this.get('repository'));
    }
  }
});

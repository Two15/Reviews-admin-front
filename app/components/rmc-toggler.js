import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service },
  merge,
  setProperties
} = Ember;

const unknownStatus = computed('repository', {
  get() {
    return this.get('ajax').repositoryStatus(this.get('repository'));
  }
});

export default Component.extend({
  ajax: service(),
  repository: null,
  status: unknownStatus,
  didUpdateAttrs() {
    this.set('status', unknownStatus);
  },
  actions: {
    toggle() {
      return Promise.resolve(this.get('status'))
        .then(({ enabled })=> !!enabled ? 'disable' : 'enable')
        .then((method)=> this.get('ajax')[method](this.get('repository')))
        .then((d)=> setProperties(this.get('repository'), d))
        .then(()=> this.set('status', computed.reads('repository')));
    }
  }
});

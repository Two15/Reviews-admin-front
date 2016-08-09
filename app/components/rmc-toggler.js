import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  computed,
  inject: { service },
  RSVP: { Promise },
  setProperties
} = Ember;

const unknownStatus = computed('repository', {
  get() {
    return this.get('ajax').repositoryStatus(this.get('repository'));
  }
});

export default Component.extend({
  ajax: service(),
  raven: service(),
  repository: null,
  status: unknownStatus,
  didUpdateAttrs() {
    this.set('status', unknownStatus);
  },
  willShowErrorInfo: task(function*() {
    this.set('hasError', true);
    yield timeout(2500);
    this.set('hasError', false);
  }).restartable(),
  actions: {
    toggle() {
      return Promise.resolve(this.get('status'))
        .then(({ enabled })=> !!enabled ? 'disable' : 'enable')
        .then((method)=> this.get('ajax')[method](this.get('repository')))
        .then((d)=> setProperties(this.get('repository'), d))
        .then(()=> this.set('status', computed.reads('repository')))
        .catch((error)=> {
          this.get('willShowErrorInfo').perform();
          this.get('raven').captureException(error);
        });
    }
  }
});

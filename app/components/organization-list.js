import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  ajax: service(),
  orgsPromise: null,
  init() {
    this._super(...arguments);
    let orgsPromise = this.get('ajax').request('http://localhost:4000/api/repos/');
    this.set('orgsPromise', orgsPromise);
  }
});

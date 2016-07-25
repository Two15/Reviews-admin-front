import Ember from 'ember';

const {
  Component,
  computed: { reads },
  inject: { service }
} = Ember;

export default Component.extend({
  ajax: service(),
  session: service(),
  me: reads('session.data.authenticated.user'),
  orgsPromise: null,
  init() {
    this._super(...arguments);
    let orgsPromise = this.get('ajax').request('http://localhost:4000/api/repos/');
    this.set('orgsPromise', orgsPromise);
  }
});

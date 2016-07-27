import Ember from 'ember';

const {
  Component,
  computed: { reads },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['org-wrap'],
  ajax: service(),
  session: service(),
  me: reads('session.data.authenticated.user'),
  orgsPromise: null,
  init() {
    this._super(...arguments);
    this.set('orgsPromise', this.get('ajax.orgs'));
  },
  actions: {
    select(org) {
      this.get('didSelect')(org.login || org.uid);
    }
  }
});

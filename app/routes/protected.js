import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),
  session: service(),
  model() {
    return this.get('ajax').request('http://localhost:4000/api');
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});

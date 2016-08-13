import Ember from 'ember';
import config from '../config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  model(params) {
    if (params.auto) {
      this.doLogin();
    }
  },
  doLogin() {
    window.location = `${config.API.rootEndpoint}/auth`;
  },
  actions: {
    login() {
      this.doLogin();
    }
  }
});

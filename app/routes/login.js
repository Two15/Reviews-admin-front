import Ember from 'ember';
import config from '../config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    login() {
      window.location = `${config.API.rootEndpoint}/auth`;
    }
  }
});

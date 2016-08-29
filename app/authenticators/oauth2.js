/*global HS */
import Ember from 'ember';
import config from '../config/environment';
import Base from 'ember-simple-auth/authenticators/base';

const {
  A,
  Error:EmErr,
  inject: { service },
  RSVP: { resolve, reject }
} = Ember;

const identifyHS = (data)=> {
  HS.beacon.ready(()=> HS.beacon.identify(data.user));
  return data;
};

const clearHSIdentity = ()=> HS.beacon.reset();

export default Base.extend({
  ajax: service(),
  tokenEndpoint: `${config.API.rootEndpoint}/auth/token`,
  invalidationEndpoint: `${config.API.rootEndpoint}/auth/logout`,
  authenticate(data) {
    return this.get('ajax').request(this.get('tokenEndpoint'), { data }).then((resp)=> {
      if (resp.errors) {
        let err = new EmErr('An error occured during logging');
        err.errors = A(resp.errors);
        return reject(err);
      }
      return resp;
    }).then((data)=> identifyHS(data));
  },
  invalidate() {
    return this.get('ajax').del(this.get('invalidationEndpoint'))
      .then(()=> clearHSIdentity())
      .finally(()=> true);
  },
  restore(data) {
    return resolve(data)
      .then((data)=> identifyHS(data));
  }
});

import Ember from 'ember';
import config from '../config/environment';
import Base from 'ember-simple-auth/authenticators/base';

const {
  A,
  Error:EmErr,
  inject: { service },
  RSVP: { resolve, reject }
} = Ember;

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
    });
  },
  invalidate() {
    return this.get('ajax').del(this.get('invalidationEndpoint')).finally(()=> true);
  },
  restore(data) {
    return resolve(data);
  }
});

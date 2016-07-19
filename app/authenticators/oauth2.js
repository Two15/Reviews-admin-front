import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  A,
  Error:EmErr,
  inject: { service },
  RSVP: { resolve, reject }
} = Ember;

export default Base.extend({
  ajax: service(),
  tokenEndpoint: 'http://localhost:4000/auth/token',
  invalidationEndpoint: 'http://localhost:4000/auth/logout',
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

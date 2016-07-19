import Ember from 'ember';

// TODO As usual, error management is hard.
// Provide a global handling mehanism

const {
  A,
  Error:EmErr,
  inject: { service },
  Route,
  RSVP: { reject }
} = Ember;

export default Route.extend({
  ajax: service(),
  session: service(),
  beforeModel(transition) {
    let { queryParams, queryParams: { code } } = transition;
    if (!code) {
      let err = new EmErr('Github returned an error');
      err.errors = A(queryParams);
      return reject(err);
    }
    return this.get('session').authenticate('authenticator:oauth2', queryParams).then(()=> {
      transition.abort();
    });
  },
  actions: {
    error({ errors }/* , transition */) {
      console.info('Error during logging');
      console.debug(errors);
      return true;
    }
  }
});

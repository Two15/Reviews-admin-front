import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import { isUnauthorizedError } from 'ember-ajax/errors';

const { computed, inject: { service }, set } = Ember;

export default AjaxService.extend({
  session: service(),
  trustedHosts: ['localhost'],
  headers: computed({
    get() {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2', (name, value)=> {
        set(headers, name, value);
      });
      return headers;
    }
  }).volatile(),
  request() {
    return this._super(...arguments).catch((error)=> {
      if (isUnauthorizedError(error) && this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
        return;
      }
      throw error;
    });
  },
  orgs: computed(function() {
    return this.request('http://localhost:4000/api/orgs/')
    .then((res)=> {
      return res.map(({uid, avatar_url})=> {
        return { uid, avatar_url, name: uid }
      });
    });
  }),
  orgRepos(orgName) {
    return this.request(`http://localhost:4000/api/repos/${orgName}`);
  }
});

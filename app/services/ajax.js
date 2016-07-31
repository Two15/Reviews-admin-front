import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import { isUnauthorizedError } from 'ember-ajax/errors';

const { computed, inject: { service }, set } = Ember;

export default AjaxService.extend({
  session: service(),
  trustedHosts: ['localhost'],
  contentType: 'application/json',
  headers: computed({
    get() {
      let headers = {
        'Content-Type': this.get('contentType')
      };
      this.get('session').authorize('authorizer:oauth2', (name, value)=> {
        set(headers, name, value);
      });
      return headers;
    }
  }).volatile(),
  options(url, hash) {
    hash = this._super(...arguments);
    if (typeof hash.data === 'object' && hash.type !== 'GET') {
      hash.data = JSON.stringify(hash.data);
    }
    return hash;
  },
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
  },
  repositoryStatus({ owner, name }) {
    return this.request(`http://localhost:4000/api/status/${owner}/${name}`);
  },
  enable({ owner, name }) {
    return this.post(`http://localhost:4000/api/status`, {
      data: { provider: 'github', owner, name }
    });
  }
});

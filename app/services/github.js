import Ember from 'ember';
import config from '../config/environment';

const {
  A,
  computed,
  inject: { service },
  Map: EmberMap,
  Service
} = Ember;

export default Service.extend({
  ajax: service(),
  _data: computed('ajax', function() {
    return this.get('ajax').request(`${config.API.rootEndpoint}/api/repos`);
  }),
  repositories: computed('_data', function() {
    return this.get('_data')
    .then((repos)=> {
      return repos.reduce((memo, repo)=> {
        let { owner } = repo;
        memo[owner] = memo[owner] || A();
        memo[owner].push(repo);
        return memo;
      }, {});
    });
  }),
  organizations: computed('_data', function() {
    return this.get('_data')
    .then((repos)=> {
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      return repos.map(({ owner, avatar_url })=> {
        return { name: owner, uid: owner, avatar_url };
      });
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    })
    .then((duplicateOrgsData)=> {
      let store = EmberMap.create();
      return duplicateOrgsData.map((repo) => {
        if (!store.has(repo.uid)) {
          store.set(repo.uid, repo);
          return repo;
        }
      });
    })
    .then((orgs)=> orgs.compact());
  }).readOnly()
});

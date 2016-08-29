import Ember from 'ember';

const {
  Component,
  computed,
  computed: { reads },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['list', 'organization-list'],
  github: service(),
  session: service(),
  me: reads('session.data.authenticated.user'),
  clientId: reads('github.clientId'),
  searchField: 'name',
  hasError: false,
  allOrgs: computed('ajax.orgs', 'me', {
    get() {
      let { uid } = this.get('me');
      return this.get('github.organizations').then((orgsArray)=> {
        return orgsArray.sort((a, b)=> {
          if (get(a, 'uid') === uid) {
            return -1;
          }
          if (get(b, 'uid') === uid) {
            return 1;
          }
          return get(a, 'uid').localeCompare(get(b, 'uid'));
        });
      }, ()=> this.set('hasError', true));
    }
  }).readOnly(),
  selectedName: undefined,
  selected: computed('selectedName', 'allOrgs', {
    get() {
      let current = this.get('selectedName');
      return this.get('allOrgs').then((orgs)=> {
        return orgs.find((o)=> o.uid === current);
      });
    }
  }),
  willEnableSearch: computed('allOrgs', function() {
    return this.get('allOrgs').then((orgs)=> orgs.length >= 6);
  }),
  actions: {
    select(org) {
      this.get('didSelect')(org.uid);
    }
  }
});

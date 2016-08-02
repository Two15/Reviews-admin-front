import Ember from 'ember';

const {
  Component,
  computed,
  computed: { reads },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['list', 'organization-list'],
  ajax: service(),
  session: service(),
  me: reads('session.data.authenticated.user'),
  searchField: 'name',
  allOrgs: computed('ajax.orgs', 'me', {
    get() {
      let { uid, avatar_url, name } = this.get('me');
      return this.get('ajax.orgs').then((orgs)=> {
        orgs.unshift({ avatar_url, uid, name: `${name}'s repositories` });
        return orgs;
      });
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

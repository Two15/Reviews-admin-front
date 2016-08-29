import Ember from 'ember';

const {
  A,
  Component,
  computed,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['list', 'repository-list'],
  searchField: 'full_name',
  github: service(),
  repos: computed('organization', {
    get() {
      let orgName = this.get('organization');
      return this.get('github.repositories')
      .then((repos)=> repos[orgName] || A());
    }
  }),
  didUpdateAttrs() {
    this._super(...arguments);
    this.set('selected', undefined);
  },
  actions: {
    select(repo) {
      this.set('selected', repo);
      this.sendAction('willEdit', repo);
    }
  }
});

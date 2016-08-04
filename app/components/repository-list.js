import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

let repos = computed('organization', {
  get() {
    return this.get('ajax').orgRepos(this.get('organization'));
  }
});

export default Component.extend({
  classNames: ['list', 'repository-list'],
  searchField: 'full_name',
  ajax: service(),
  repos,
  didUpdateAttrs() {
    this._super(...arguments);
    // Resets the repos
    this.set('repos', repos);
    this.set('selected', undefined);
  },
  actions: {
    select(repo) {
      this.set('selected', repo);
      this.sendAction('willEdit', repo);
    }
  }
});

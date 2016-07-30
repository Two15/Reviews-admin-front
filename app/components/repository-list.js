import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;
export default Component.extend({
  classNames: ['list', 'repository-list'],
  searchField: 'full_name',
  ajax: service(),
  repos: computed('organization', {
    get() {
      return this.get('ajax').orgRepos(this.get('organization'));
    }
  }).readOnly(),
  actions: {
    select() {

    }
  }
});

import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    return params.repo_name;
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
  }
});

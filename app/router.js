import Ember from 'ember';
import config from './config/environment';

const { Router:EmRouter } = Ember;

const Router = EmRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('protected', { path: '/' }, function() {
    this.route('repo', { path: '/:repo_name' });
  });
  this.route('login', function() {
    this.route('response');
  });
});

export default Router;

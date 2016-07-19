import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('protected', { path: '/' });
  this.route('login', function() {
    this.route('response');
  });
});

export default Router;

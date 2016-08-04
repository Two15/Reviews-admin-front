/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'front',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    API: {
      trustedHosts: ['localhost'],
      rootEndpoint: 'http://localhost:4000'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      routeAfterAuthentication: 'protected',
      routeIfAlreadyAuthenticated: 'protected'
    }
  };

  if (environment === 'development') {
    ENV.contentSecurityPolicy = {
      'connect-src': ["'self'", "http://localhost:4000"]
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicyHeader = 'Content-Security-Policy';
    ENV.contentSecurityPolicy = {
      'connect-src': ["'self'", 'https://review-my-code.herokuapp.com'],
      'img-src': ["'self'", 'https://avatars.githubusercontent.com']
    };
    ENV.API = {
      trustedHosts: ['review-my-code.herokuapp.com'],
      rootEndpoint: 'https://review-m-code.herokuapp.com'
    };
  }

  return ENV;
};

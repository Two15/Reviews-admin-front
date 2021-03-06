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

    github: {
      clientId: process.env.GITHUB_CLIENT_ID
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
    },
    sentry: {
      dsn: 'https://09eb7ede884a40f39b84b21713eba290@app.getsentry.com/90884',
      debug: environment === 'development',
      development: environment === 'development',
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
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.ravenjs.com'],
      'connect-src': ["'self'", 'app.getsentry.com', 'https://review-my-code.herokuapp.com'],
      'img-src': ["'self'", 'https://avatars.githubusercontent.com', 'data: app.getsentry.com']
    };
    ENV.API = {
      trustedHosts: ['review-my-code.herokuapp.com'],
      rootEndpoint: 'https://review-my-code.herokuapp.com'
    };
  }

  return ENV;
};

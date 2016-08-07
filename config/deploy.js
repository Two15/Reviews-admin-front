/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3 = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET_URI,
      region: process.env.S3_REGION
    };
    ENV['s3-index'] = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET_URI,
      region: process.env.S3_REGION
    };
    ENV.cloudfront = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      distribution: process.env.CLOUDFRONT_DISTRIBUTION
    };
    ENV.gzip = {
      ignorePattern: '**/*.map'
    };
    ENV.sentry = {
      publicUrl: 'https://admin.review.two15.co',
      sentryUrl: 'https://app.getsentry.com',
      sentryOrganizationSlug: 'xavier-cambar',
      sentryProjectSlug: 'reviewmycode-front',
      sentryApiKey: process.env.SENTRY_API_KEY
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};

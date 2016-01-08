Package.describe({
  name: 'maodouio:activity-notifications',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Maodou.io activities-notifications package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/maodouio/meteor-activities-notifications',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.2.1");

  api.addFiles("client/startup.js", "client");
  api.addFiles("server/sendMessage.js", "server");
});

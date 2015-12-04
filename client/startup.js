Meteor.startup(function () {
  console.log("set hasPackageActivityNotifications = true");
  Session.set('hasPackageActivityNotifications', true);
});

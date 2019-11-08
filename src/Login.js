const firebase = require("firebase");
const firebaseui = require("firebaseui");

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      // Allow the user the ability to complete sign-in cross device,
      // including the mobile apps specified in the ActionCodeSettings
      // object below.
      forceSameDevice: false,
      // Used to define the optional firebase.auth.ActionCodeSettings if
      // additional state needs to be passed along request and whether to open
      // the link in a mobile app if it is installed.
      emailLinkSignIn: function() {
        return {
          // Additional state showPromo=1234 can be retrieved from URL on
          // sign-in completion in signInSuccess callback by checking
          // window.location.href.
          url: 'https://www.example.com/completeSignIn?showPromo=1234',
          // Custom FDL domain.
          dynamicLinkDomain: 'example.page.link',
          // Always true for email link sign-in.
          handleCodeInApp: true,
          // Whether to handle link in iOS app if installed.
          iOS: {
            bundleId: 'com.example.ios'
          },
          // Whether to handle link in Android app if opened in an Android
          // device.
          android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
          }
        };
      }
    }
  ]
});
// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}
// This can also be done via:
if ((firebase.auth().isSignInWithEmailLink(window.location.href)) {
  ui.start('#firebaseui-auth-container', uiConfig);
}
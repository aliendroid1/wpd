

function toggleSignIn() //Function called when clicking the Login/Logout button.
{
    if (!firebase.auth().currentUser)
    {
        var provider = new firebase.auth.GoogleAuthProvider();
           
        provider.addScope('http://localhost:4000/auth/plus.login');
        //provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }
    else 
        {firebase.auth().signOut();}
    document.getElementById('sign-in-button').disabled = true;
}
function initApp() //handles setting up UI event listeners and registering Firebase auth listeners:
{ 
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        //  document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
        //  document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
    
    firebase.auth().onAuthStateChanged(function (user)// This listener is called when the user is signed in or out, and that is where we update the UI.
    {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById('sign-in-button').textContent = ' Log-out';
        } 
        else // User is signed out.
            {document.getElementById('sign-in-button').textContent = ' Log-in'}
        document.getElementById('sign-in-button').disabled = false;
    });
}
var config = {
  apiKey: "AIzaSyDUxm4IWiOSAzeAhbm3xzdcqTKllQpiyss",
  authDomain: "wpdresourcehub.firebaseapp.com",
  storageBucket: "wpdresourcehub.appspot.com",
  messagingSenderId: "865510208619",
};
var firebaseConfig = {
  apiKey: "AIzaSyDUxm4IWiOSAzeAhbm3xzdcqTKllQpiyss",
authDomain: "wpdresourcehub.firebaseapp.com",
storageBucket: "wpdresourcehub.appspot.com",
messagingSenderId: "865510208619",
projectId: "wpdresourcehub",
appId: "1:865510208619:web:b2cfc8b743e752fd5b2d2e"
};



// var serviceAccount = require("wpdresourcehub-e3af9d78a67e.json");
  // projectId: "wpdresourcehub",
  
  
  // appId: "1:865510208619:web:b2cfc8b743e752fd5b2d2e",
  // measurementId: "G-DPQ35C1Y7F"

window.onload = function (){initApp();};
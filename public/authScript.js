

function toggleSignIn() //Function called when clicking the Login/Logout button.
{
    if (!firebase.auth().currentUser) 
    {
        let provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({tenant: 'wichita.edu'});
        provider.addScope('openid');
        provider.addScope('profile');
        provider.addScope('user.read');
        provider.addScope('Calendars.ReadWrite.Shared');
        provider.addScope('Mail.ReadWrite');
        provider.addScope('User.ReadBasic.All');
        provider.addScope('mail.send');
        provider.addScope('mail.send.shared');
        provider.addScope('OnlineMeetings.ReadWrite');
        firebase.auth().signInWithRedirect(provider);
    }
    else 
        {firebase.auth().signOut();}
    document.getElementById('sign-in-button').disabled = true;
}
function initApp() //handles setting up UI event listeners and registering Firebase auth listeners:
{ 
    firebase.auth().getRedirectResult().then(function(result)
    {
        if (result.credential) 
        {
            var token = result.credential.accessToken;// This gives you a Microsoft Access Token. You can use it to access the Microsoft API.
            var idToken = result.credential.idToken;  // You can also retrieve the OAuth ID token.
            
            let url = 'https://graph.microsoft.com/v1.0/users/h993v365@wichita.edu?$select=displayName,givenName,surname,userPrincipalName,mail,id';
            const options = 
            {
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`},
            }
            // fetch(url, options).then(res => res.json()).then(data => console.log(data))
            
            async function fetchData(url, options)
            {
                let response = await fetch(url, options);
                let data     = await response.json();
                data = JSON.stringify(data);
                data = JSON.parse(data);
                console.log(data.id);
                return data;
            }
            let userObject = fetchData(url,options);
            // const sendMail = 
            // {
                //     message: 
                //     {
                    //         subject: "Tutoring Session Confirmation",
                    //         body: 
                    //         {
                        //             contentType: "Text",
                        //             content: "The new cafeteria is open."
                        //         },
                        //         toRecipients: [{emailAddress: {address: "ali.nadeem123@gmail.com" }}],
                        //         ccRecipients: [{emailAddress: {address: "ali@alicodes.net"        }}]
                        //     },
                        //     saveToSentItems: "true"
                        // };
                        // let url = 'https://graph.microsoft.com/v1.0/me/sendMail'
                        // const options = 
                                    // {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json',Authorization: `Bearer ${token}`},
            //     body: JSON.stringify(sendMail)
            // }
            // fetch(url, options).then(result => console.log(result))
            // const onlineMeeting = 
            // {
            //     startDateTime: "2020-08-25T01:49:21.3524945+00:00",
            //     endDateTime: "2020-08-25T02:19:21.3524945+00:00",
            //     subject: "Tutoring Meeting",
            //     participants:
            //     {
            //         organizer:  {upn: "y672h974@wichita.edu"},
            //         attendees: [{upn: "h993v365@wichita.edu"}]
            //     }
            // };
            // url = 'https://graph.microsoft.com/v1.0/me/onlineMeetings'
            // const options = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`
            //     },
            //     body: JSON.stringify(onlineMeeting)
            // }
            // fetch(url, options).then(res => res.json()).then(data => console.log(data))
        } 
        var user = result.user; // The signed-in user info.
    })
    .catch(function(error){{console.error(error);}})
    
    firebase.auth().onAuthStateChanged(function (user)// This listener is called when the user is signed in or out, and that is where we update the UI.
    {
        if (user) // User is signed in.
            {document.getElementById('sign-in-button').textContent = ' Log-out';} 
        else // User is signed out.
            {document.getElementById('sign-in-button').textContent = ' Log-in'}
        document.getElementById('sign-in-button').disabled = false;
    });
}

async function fetchData(url, options)
{
    let response = await fetch(url, options);
    let data     = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    console.log(data.id);
    return data;
}
                        

window.onload = function (){initApp();};
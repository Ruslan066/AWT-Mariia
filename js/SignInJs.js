//let auth22={}
var startApp = function (googleUser, userr) {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth22 = gapi.auth2.init({
            client_id: '212489423994-u5pqse4dhbod11f16u7ntlui8i64q2hu.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            plugin_name: "chat"
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('customBtn'), googleUser, userr);
    });
};



function attachSignin(element, googleUser, userr) {
    //console.log(element.id || null);
    auth22.attachClickHandler(element, {},
        function (googleUser, name) {
            var profile = googleUser.getBasicProfile();
            userr.id += profile.getId();
            userr.name = profile.getName();
            userr.imgUrl = profile.getImageUrl();
            userr.email = profile.getEmail();

            userr.isSingIn = "You are not sign in account :(";

            if(userr.name !== null){
                userr.isSingIn = "You are sign in account :)";
            }
            alert( userr.id);
            window.localStorage.setItem('userID', userr.id);

        }, function (error) {

        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("Boli ste odhlásený...");
        // znovu načítame stránku a zobrazíme tlačidlo pre prihlásenie
        localStorage.clear();

        location.reload();
    });
}
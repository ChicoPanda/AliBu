'use strict';

var provider;

$(document).ready(function () {
    $('#user-info').hide();
    $('#user-logout').hide();

    afterLogin();
    $('#logInGmail').on('click', function () {
        loginGmail();
    });

    $('#logInTwitter').on('click', function () {
        loginTwitter();
    });

    $('#logInGitHub').on('click', function () {
        loginGH();
    });

    $('#user-logout').on('click', function () {
        logOut();
    });
});

function loginGH() {
    location.replace("https://github.com/login/oauth/authorize?scope=read:user&client_id=49fb29d304add4a887aa");
}

function loginGmail() {
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

function loginTwitter() {
    provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

function afterLogin() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            $('#user-info').show();
            $('#user-logout').show();
            $('#user-register').hide();

            // User Data
            var type = result.additionalUserInfo.providerId;
            var user = result.user;
            var userName = user.displayName;
            var avatar = user.photoURL;

            $('#user-info .text-menu').text(userName);
            $('#user-info .user-avatar').css("background-image", "url('" + avatar + "')");

            // AÑADIR LOCALSTORAGE
            var userLogged = [userName, avatar, type];
            localStorage.setItem("userLogged", JSON.stringify(userLogged));
        }
    }).catch(function (error) {
        console.log("Ha ocurrido un error: " + error.message + " Código de error: " + error.code + " Cuenta: " + error.email + " Credenciales: " + error.credential);
    });
}

function logOut() {
    var typeNetwork = JSON.parse(localStorage.getItem("userLogged"))[2];
    console.log(typeNetwork);
    switch (true) {
        case typeNetwork == "facebook.com":
            FB.logout(function (response) {
                alert("Has cerrado la sesión con éxito.");
                $('#user-info').hide();
                $('#user-logout').hide();
                $('#user-register').show();
            });
            break;
        case typeNetwork == "twitter.com":
        case typeNetwork == "google.com":
            firebase.auth().signOut().then(function () {
                alert("Has cerrado la sesión con éxito.");
                $('#user-info').hide();
                $('#user-logout').hide();
                $('#user-register').show();
            }).catch(function (error) {
                alert("No se ha podido cerrar la sesión.");
            });
            break;
    }
    localStorage.removeItem("userLogged");
}
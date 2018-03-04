'use strict';

$(document).ready(function () {
    $('#user-info').hide();
    $('#user-logout').hide();

    afterLogin();
    $('#logInGmail').on('click', function () {
        loginGmail();
    });

    $('#user-logout').on('click', function () {

        logoutGmail();
    });
});

function loginGmail() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().useDeviceLanguage();
}

function afterLogin() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            $('#user-info').show();
            $('#user-logout').show();
            $('#user-register').hide();

            // User Data
            var user = result.user;
            var userName = user.displayName;
            var userEmail = user.email;
            var avatar = user.photoURL;

            $('#user-info .text-menu').text(userName);
            $('#user-info .user-avatar').css("background-image", "url('" + avatar + "')");

            // AÑADIR LOCALSTORAGE
            var userLogged = ["gmail", userName, userEmail, avatar];
            localStorage.setItem("userLogged", JSON.stringify(userLogged));
        }
    }).catch(function (error) {
        console.log("Ha ocurrido un error: " + error.message + " Código de error: " + error.code + " Cuenta: " + error.email + " Credenciales: " + error.credential);
    });
}

function logoutGmail() {
    firebase.auth().signOut().then(function () {
        alert("Has cerrado la sesión con éxito.");
        $('#status').text('');
        $('#user-info').hide();
        $('#user-logout').hide();
        $('#user-register').show();
    }).catch(function (error) {
        alert("No se ha podido cerrar la sesión.");
    });
}
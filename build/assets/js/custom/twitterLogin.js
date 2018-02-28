'use strict';

var isLogged = false;
$(document).ready(function () {
    afterTwitterLogin();
    //Usar localStorage para guardar isLogged y extraerla aquí para que tras la redirección
    //se sepa si era true o no
    //alert(isLogged);
    /*if(isLogged){
        $('#logIn').remove();
        $('<button id="logOut">Twitter Log Out</button>').appendTo('#twitterLogin');
        twitterLogoutClickEventHandler();
    }else{
        $('#logOut').remove();
        $('<button id="logIn">Twitter Log In</button>').appendTo('#twitterLogin');
        twitterLoginClickEventHandler();
    }*/

    /*$('#logOut').hide();
    if($('#logIn').is(':hidden')){
        $('#logOut').show();
    }*/

    $('#logOut').on('click', function () {
        twitterLogout();
    });
});

/*
    Y por otro lado el otro detallito es que si se hace click para el login y en la página de 
    redirección se hace click en Cancelar se dan dos opciones para volver. Un botoncito y debajo un enlace
    El botoncito funciona perfectamente pero si se usa el enlace el botón de login no se vuelve a activar
    por razones que desconozco. Pero me he fijado que el botón usa el callback de twitter que es un enlace
    que firebase te da para que pongas en la aplicacion de twitter y el enlace usa el nombre del website
    que es 127.0.0.1.
*/
function twitterLogin() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

function afterTwitterLogin() {
    $('<img class="spinner" src="/build/assets/img/spinner.gif">').appendTo('#twitterLogin');
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            //Datos del usuario
            var user = result.user;
            var userName = user.displayName;
            var avatar = user.photoURL;
            //alert(user.displayName + " | " +user.photoURL);
            $('.spinner').remove();
            $('#logIn').remove();
            $('<button id="logOut">Twitter Log Out</button>').appendTo('#twitterLogin');
            $('<div class="userLogged"><label>Bienvenido ' + userName + '<img class="avatar" src="' + avatar + '"></label></div>').appendTo('#twitterLogin');
            twitterLogoutClickEventHandler();

            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.

            //Estas claves se usarían para otras peticiones a la API pero eso ya no nos hace falta
            //En teoría el usuario ya se ha autentificado
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // ...
            //alert("Login Correcto con redirect");
            // The signed-in user info.

            $('#status').text('Estas conectado con Twitter');

            //A partir de aquí habría que hacer consistente el logging...probablemente guardar el nombre
            //de usuario y su imagen en el localStorage porque hasta este punto si se recargfa la página
            //es como si no estuviese logueado
        } else {
            /*Este alert solo es de prueba para comprobar que al entrar en la página
            sin haberse logueado el flujo del programa va por aquí.*/
            //alert("El usuario no ha hecho click en el botón de loggin");
            $('.spinner').remove();
            $('#logOut').remove();
            $('<button id="logIn">Twitter Log In</button>').appendTo('#twitterLogin');
            twitterLoginClickEventHandler();
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        alert(errorMessage);
    });
}

function twitterLogout() {
    firebase.auth().signOut().then(function () {
        //alert("Te has deslogueado con éxito");
        $('#status').text('');
        $('#logOut').remove();
        $('.userLogged').remove();
        $('<button id="logIn">Twitter Log In</button>').appendTo('#twitterLogin');
        twitterLoginClickEventHandler();
        //Aquí habría que borrar la variable del usuario en el localStorage
    }).catch(function (error) {
        // An error happened.
        alert("Error al desloguearse");
    });
}

function twitterLoginClickEventHandler() {
    $('#logIn').on('click', function () {
        $('#logIn').remove();
        twitterLogin();
    });
}

function twitterLogoutClickEventHandler() {
    $('#logOut').on('click', function () {
        twitterLogout();
    });
}
$(document).ready(function(){
    $('#logIn').on('click', function(){
        twitterLogin();
    });

    $('#logOut').on('click', function() {
        twitterLogout();
    });
    
})

/*
    Lgin de Twitter casi terminado. Hay dos problemillas, uno más importante que el otro. Por un lado
    la función getRedirectREsult debería ejecutarse después de signInWithRedirect pero no es así. Por 
    alguna razón la redirección tarda un poco y el programa sigue leyendo y lee lo que hay debajo. Ya
    me pasó algo parecido en una práctica de DOR y le encontré solución, epsero poder hacerlo aquí también
    ya que la variable result nos trae los datos del usuario logueado y eso nos puede interesar. Por
    supuesto si se os ocurre algo genial.

    Y por otro lado el otro detallito es que si se hace click para el login y en la página de 
    redirección se hace click en Cancelar se dan dos opciones para volver. Un botoncito y debajo un enlace
    El botoncito funciona perfectamente pero si se usa el enlace el botón de login no se vuelve a activar
    por razones que desconozco. Pero me he fijado que el botón usa el callback de twitter que es un enlace
    que firebase te da para que pongas en la aplicacion de twitter y el enlace usa el nombre del website
    que es 127.0.0.1.
*/
function twitterLogin(){
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // ...
            
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        alert("Login Correcto con redirect");
        alert(user);
    }).catch(function(error) {
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

function twitterLogout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Te has deslogueado con éxito");
      }).catch(function(error) {
        // An error happened.
        alert("Error al desloguearse");
      });
}
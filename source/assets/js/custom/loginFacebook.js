 //FUNCIONA SOLO SI SE USA CON LA DIRECCION "LOCALHOST", NO FUNCIONARA SI LO HACEMOS DESDE GITHUB
 window.fbAsyncInit = function() {
     //  $('#user-info').hide();
     //  $('#user-logout').hide();

     FB.init({
         appId: '1985468138447086',
         xfbml: true,
         version: 'v2.5'
     });
     //  FB.getLoginStatus(function(response) {
     //      if (response.status === 'connected') {
     //          // HAY QUE ARREGLAR ESTO
     //          setTimeout(getInfo(), 3000);
     //      } else if (response.status === 'not_authorized') {
     //          console.log("Ha ocurrido un error al iniciar sesión con facebook.")
     //      } else {
     //          console.log("Ha ocurrido un error al iniciar sesión con facebook.")
     //      }
     //  });
 };
 (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) { return; }
     js = d.createElement(s);
     js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 // logeo normal
 function loginFB() {
     FB.login(function(response) {
         if (response.status === 'connected') {
             // HAY QUE ARREGLAR ESTO
             setTimeout(getInfo(), 3000);
         } else if (response.status === 'not_authorized') {
             console.log("Ha ocurrido un error al iniciar sesión con facebook.")
         } else {
             console.log("Ha ocurrido un error al iniciar sesión con facebook.")
         }
     }, { scope: 'email' });
 }

 // Te da tu id
 function getInfo() {
     FB.api('/me', 'GET', { fields: 'first_name,last_name,name,picture,id' }, function(response) {
         // User Data
         var userName = response.first_name + " " + response.last_name;
         var userEmail = response.email;
         var avatar = response.picture.data.url;

         $('#user-info .text-menu').text(userName);
         $('#user-info .user-avatar').css("background-image", "url('" + avatar + "')");

         // AÑADIR LOCALSTORAGE
         var userLogged = [userName, avatar, "facebook.com"];
         localStorage.setItem("userLogged", JSON.stringify(userLogged));

         $("#spinner").show();
         setTimeout(function() {
             location.href = "../../../index.html";
         }, 2000);
     });
 }
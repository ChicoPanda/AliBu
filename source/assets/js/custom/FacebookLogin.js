 //FUNCIONA SOLO SI SE USA CON LA DIRECCION "LOCALHOST", NO FUNCIONARA SI LO HACEMOS DESDE GITHUB
 window.fbAsyncInit = function() {
     FB.init({
         appId: '1985468138447086',
         xfbml: true,
         version: 'v2.5'
     });
     FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
             document.getElementById('status').innerHTML = 'Estas conectado.';
             document.getElementById('login').style.visibility = 'hidden';
         } else if (response.status === 'not_authorized') {
             document.getElementById('status').innerHTML = 'No estas conectado.'
         } else {
             document.getElementById('status').innerHTML = 'No estas conectado.';
         }
     });
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
 function loginfb() {
     FB.login(function(response) {
         if (response.status === 'connected') {
             document.getElementById('status').innerHTML = 'Estas conectado.';
             document.getElementById('login').style.visibility = 'hidden';
         } else if (response.status === 'not_authorized') {
             document.getElementById('status').innerHTML = 'No estas conectado.'
         } else {
             document.getElementById('status').innerHTML = 'No estas conectado.';
         }
     }, { scope: 'email' });
 }

 // Te da tu id
 function getInfo() {
     FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id' }, function(response) {
         document.getElementById('status').innerHTML = response.id;
     });
 }
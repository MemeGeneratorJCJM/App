// (function($){
//   $(function(){
let userData;
    
    

//   }); // end of document ready
// })(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  
  
 
  $('#btnRegister').click(function(){
    
    
    window.location.href="register.html";
    
    
    });
  $('#btnLogin').click(function(){
  
  //window.location.href="MemeGenerator.html";
  validateLogin();
  
  
  });
 
}




function validateLogin() {
  var pass = $('#pwd').val();
  
  var query = {
    "email": $('#email').val(),
    "password": pass

  }
  $.ajax({
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    url: "https://meme-generator-jcg-jmm.herokuapp.com/user/signin",
    //url: "http://localhost:3000/user/signin",
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    data: JSON.stringify(query),
  }).done(function (response) {
    userData = response;
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href="MemeGenerator.html";

  }).fail(function (response) {
    if (response.responseJSON != undefined) {
      alert(response.responseJSON.statusData);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
    
  });
}



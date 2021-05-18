// (function($){
//   $(function(){
var userData;
    
    

//   }); // end of document ready
// })(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  
  
  // $("#btnLogin").click(validateLogin);
  $('#btnRegister').click(function(){
    // location.replace("MemeGenerator.html","blank");
    
    window.location.href="register.html";
    
    
    });
  $('#btnLogin').click(function(){
  // location.replace("MemeGenerator.html","blank");
  
  window.location.href="MemeGenerator.html";
  //validateLogin();
  
  
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
    url: "https://meme-generator-jcg-jmm.herokuapp.com/",
    //url: "http://localhost:3000/user/signin",
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    data: JSON.stringify(query),
  }).done(function (response) {
    userData = response;
    console.log(userData);
    window.location.href="MemeGenerator.html";

  }).fail(function (response) {
    if (response.responseJSON != undefined) {
      alert(response.responseJSON.statusData);
    } else {
      alert("Error de conexión");
    }
    
  });
}



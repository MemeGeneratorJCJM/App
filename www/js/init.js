(function($){
  $(function(){

    // $('.sidenav').sidenav();
   
    

  }); // end of document ready
})(jQuery); // end of jQuery name space
$("#btnRegister").click(function(){
  // location.replace("register.html");
  window.location="register.html";
});



function validateLogin() {
  var pass = $('#pwd').val();
  
  var query = {
    "username": $('#email').val(),
    "password": pass

  }
  $.ajax({
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    url: "https://memegenerator-jcg-jmm.herokuapp.com/login/user",
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    data: JSON.stringify(query),
  }).done(function (response) {
   


  }).fail(function (response) {
    if (response.responseJSON != undefined) {
      alert(response.responseJSON.statusData);
    } else {
      alert("Error de conexión");
    }
    
  });
}

// $("#btnLogin").click(validateLogin);
$("#btnLogin").click(function(){
  // location.replace("MemeGenerator.html","blank");
  window.location="MemeGenerator.html";
});

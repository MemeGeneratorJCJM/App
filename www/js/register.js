(function($){
    $(function(){
  
    //   $('.sidenav').sidenav();
     
      
  
    }); // end of document ready
  })(jQuery); 
  $("#username").click(updateRegisterbtn);
  $("#email").click(updateRegisterbtn);
  $("#pwd").click(updateRegisterbtn);
  $("#cpwd").click(updateRegisterbtn);
  function updateRegisterbtn(){
    if($("#username").val()!="" && $("#email").val()!="" && $("#pwd").val()!="" && $("#cpwd").val()!=""){
      if($("#pwd").val()==$("#cpwd").val()){
        $("#btnRegister").attr('class','waves-effect waves-light btn centrar');
      }else{
        $('#btnRegister').attr('class','waves-effect waves-light btn centrar disabled');
      }
    }
  }
  $("#btnRegister").click(function(){
      registerUser();
  });

  function registerUser() {
    var pass = $('#pwd').val();
    
    var query = {
      "username": $('#username').val(),
      "email": $('#email').val(),
      "password": pass
  
    }
    $.ajax({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      //url: "https://memegenerator-jcg-jmm.herokuapp.com/user/signup",
      url: "http://localhost:3000/user/signup",
      contentType: "application/json",
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify(query),
    }).done(function (response) {
     alert("Usuario creado correctamente");
  	 window.location.href="index.html";
  
    }).fail(function (response) {
      if (response.responseJSON != undefined) {
        alert(response.responseJSON.statusData);
      } else {
        alert("Error de conexión");
      }
      
    });
  }
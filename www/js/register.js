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
      //Launch AJAX query for register
      //registerUser();
      //Open login
    // location.replace("index.html");
    window.location.href="index.html";
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
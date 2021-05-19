//var PESDK;
var userMemes;
(function($){
    $(function(){
  
    //   $('.sidenav').sidenav();
   
    }); // end of document ready
  })(jQuery); 
  $('.tabs').tabs({ "swipeable": true });
  $(document).ready(function () {
    
    $(".carousel")[0].style = "height: 100vh;";
    
  });
 let userData = JSON.parse(localStorage.getItem("userData"))[0];
 $('lblUsername').val(userData.username);
 getUserMemes();

  
 function getUserMemes(){
  $.ajax({
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'https://meme-generator-jcg-jmm.herokuapp.com/user/findMemesByUsername/'+userData.username,
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    
  }).done(function (response) {
    userMemes = response;
    console.log(userMemes);
    setUserMemes();
  }).fail(function (response) {
    alert("Error con el ciclo del usuario")
  });
}

function setUserMemes(){
  for (let index = 0; index < userMemes.length; index++) {
    $("#userMemeList").append("<li><img src="+userMemes[index].rute+"></li>");
    
  }
   
  
}
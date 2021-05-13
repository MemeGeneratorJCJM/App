//var PESDK;
(function($){
    $(function(){
  
    //   $('.sidenav').sidenav();
   
    }); // end of document ready
  })(jQuery); 
  $('.tabs').tabs({ "swipeable": true });
  $(document).ready(function () {
    
    $(".carousel")[0].style = "height: 100vh;";
    
  });
  var app = {
    // Application Constructor
    initialize: function () {
      document.addEventListener(
        "deviceready",
        this.onDeviceReady.bind(this),
        false
      );
    },
  
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
      this.receivedEvent("deviceready");
      // check for permissions
      var permissions = cordova.plugins.permissions;
      permissions.requestPermission(
        permissions.WRITE_EXTERNAL_STORAGE,
        success,
        error
      );
      function error() {
        console.warn("Write permission is not turned on");
      }
      function success(status) {
        if (!status.hasPermission) error();
      }
  
      pesdk_success = function (result) {
        if (result != null) {
          alert("PESDK result: " + result.image);
        } else
          console.log("pesdk_success: result is null, the editor was canceled");
      };
  
      pesdk_failure = function (error) {
        console.log("pesdk_failure: " + JSON.stringify(error));
      };
  
      editButton = document.getElementById("editButton");
  
      editButton.addEventListener("click", function () {
        /* The license should have an extension like this:
           for iOS: "xxx.ios", example: pesdk_license.ios
           for Android: "xxx.android", example: pesdk_license.android
           then pass the name without the extension to the `unlockWithLicense`
           function */
        // PESDK.unlockWithLicense('www/assets/pesdk_license');
  
        var config = {
          // Configure sticker tool
          sticker: {
            // Enable personal stickers
            personalStickers: true,
            // Configure stickers
            categories: [
              // Create sticker category with stickers
              {
                identifier: "example_sticker_category_logos",
                name: "Logos",
                thumbnailURI: PESDK.loadResource("www/assets/imgly-Logo.png"),
                items: [
                  {
                    identifier: "example_sticker_logos_cordova",
                    name: "Cordova",
                    stickerURI: PESDK.loadResource("www/img/logo.png"),
                  },
                  {
                    identifier: "example_sticker_logos_imgly",
                    name: "img.ly",
                    tintMode: "colorized",
                    stickerURI: PESDK.loadResource("www/assets/imgly-Logo.png"),
                  },
                ],
              },
              // Use existing sticker category
              { identifier: "imgly_sticker_category_emoticons" },
              // Modify existing sticker category
              {
                identifier: "imgly_sticker_category_shapes",
                items: [
                  { identifier: "imgly_sticker_shapes_badge_01" },
                  { identifier: "imgly_sticker_shapes_arrow_02" },
                  { identifier: "imgly_sticker_shapes_spray_03" },
                ],
              },
            ],
          },
        };
  
        PESDK.openEditor(
          pesdk_success,
          pesdk_failure,
          PESDK.loadResource("www/assets/LA.jpg"),
          config
        );
      });
    },
  
    // Update DOM on a Received Event
    receivedEvent: function (id) {
      var parentElement = document.getElementById(id);
      // var listeningElement = parentElement.querySelector(".listening");
      // var receivedElement = parentElement.querySelector(".received");
  
      // listeningElement.setAttribute("style", "display:none;");
      // receivedElement.setAttribute("style", "display:block;");
  
      // console.log("Received Event: " + id);
    },
  };
  
  app.initialize();
  

//   function textChangeListener(evt) {
//     var id = evt.target.id;
//     var text = evt.target.value;

//     if (id == "topLineText") {
//         window.topLineText = text;
//     } else {
//         window.bottomLineText = text;
//     }

//     redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
// }

// function redrawMeme(image, topLine, bottomLine) {
//     // Get Canvas2DContext
//     var canvas = document.querySelector('canvas');
//     var ctx = canvas.getContext("2d");
//     if (image != null)
//         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//     // Text attributes
//     ctx.font = '23pt Times New Roman';
//     ctx.textAlign = 'center';
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 3;
//     ctx.fillStyle = 'white';

//     if (topLine != null) {
//         ctx.fillText(topLine, canvas.width / 2, 40);
//         ctx.strokeText(topLine, canvas.width / 2, 40);
//     }

//     if (bottomLine != null) {
//         ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
//         ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
//     }
// }

// $("#saveBtn").click(handleFileSelect);

// function saveFile() {
//     window.open(document.querySelector('canvas').toDataURL());
// }

// function handleFileSelect(evt) {
//     var canvasWidth = 300;
//     var canvasHeight = 300;
//     var file = evt.target.files[0];



//     var reader = new FileReader();
//     reader.onload = function (fileObject) {
//         var data = fileObject.target.result;

//         // Create an image object
//         var image = new Image();
//         image.onload = function () {

//             window.imageSrc = this;
//             redrawMeme(window.imageSrc, null, null);
//         }

//         // Set image data to background image.
//         image.src = data;
//         console.log(fileObject.target.result);
//     };
//     reader.readAsDataURL(file)
// }
// window.topLineText = "";
// window.bottomLineText = "";

//     var input1 = document.getElementById('topLineText');
//     var input2 = document.getElementById('bottomLineText');
//     input1.oninput = textChangeListener;
//     input2.oninput = textChangeListener;
// // var input1 = $('.mainContainer .bodyContainer .memeContent .topLine').val();
// // var input2 = $('.mainContainer .bodyContainer .memeContent .bottomLine').val();
// // input1.oninput = textChangeListener;
// // input2.oninput = textChangeListener;
// // input1.onkeyup=textChangeListener;
// // input2.onkeyup()=textChangeListener;

// bind('.mainContainer .bodyContainer .uploadImage .button', function () {
//     $(this).on('change', handleFileSelect);
// });
// bind('.mainContainer .bodyContainer .saveImage .button', saveFile);
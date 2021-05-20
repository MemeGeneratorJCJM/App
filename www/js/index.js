/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
let finalPath;
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
    //   this.receivedEvent("deviceready");
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

      
  
      function openMemeEditor() {
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
        console.log(finalPath);
        PESDK.openEditor(
          pesdk_success,
          pesdk_failure,
          PESDK.loadResource("www/img/basememe.jpg"),
          config
        );
      };
      $("#btnSelectMeme").on("click", function() {
        // (async () => {
        //   const file = await chooser.getFile();
        //   console.log(file);
        //     // Request the URL for this entry
        //   fileURL = window.resolveLocalFileSystemURL();
        //   console.log(fileURL);
        // })();
        customFileChooser.open('image/png, image/jpeg, .jpg,',async function (uri) {
          console.log(uri)
          //const file = new File(uri);
          // Do something with that file
          // Request the URL for this entry

          var uripath = uri;

          window.FilePath.resolveNativePath(uripath, successNative, failNative);
                  
          function failNative(e) {
              console.error('Houston, we have a big problem :(');
          }

          async function successNative(path) {
            finalPath = await path;
            console.log(finalPath);
            openMemeEditor();
          } 

          // fileURL = file.toURL();
          // console.log(fileURL);
          
          
        }, function(err){
          alert('No se ha podido subir el archivo');
        })
        
         
    });
    },
  
    // Update DOM on a Received Event
    // receivedEvent: function (id) {
    //   var parentElement = document.getElementById(id);
    //   var listeningElement = parentElement.querySelector(".listening");
    //   var receivedElement = parentElement.querySelector(".received");
  
    //   listeningElement.setAttribute("style", "display:none;");
    //   receivedElement.setAttribute("style", "display:block;");
  
    //   console.log("Received Event: " + id);
    // },
   
  };
  
  app.initialize();

  
  
(function ($) {
	$(function () {

		// $('.sidenav').sidenav();
		$(document).ready(function () {
			$('.tabs').tabs({ "swipeable": true });
			$(".carousel")[0].style = "height: 100vh;";
		});

	}); // end of document ready
})(jQuery);

document.addEventListener('deviceready', onDeviceReady, false);

// Variables Generales:
let userData;

let userMemes;
let searchMemes;

let generatedImage = "";

// Variables Tab Editor:
let btnSelect;
let btnUpload;
let btnDownload;
let btnDownloadSelectedMeme;
let btnDownloadSelectedUserMeme;
let memeSearchInput;

function onDeviceReady() {
	try {
		userData = JSON.parse(localStorage.getItem("userData"))[0];
		$('#lblUsername')[0].innerHTML = userData.username ? userData.username : "Usuario";
	} catch (error) {
		console.log("Internal log: Error - userData");
	}

	//getUserMemes();

	$("#btnEditSelected").on("click", getMemesByName);
	
	btnSelect = $("#btnSelectMeme").on("click", function() {
		navigator.camera.getPicture(onSuccess, onFail, {
			quality: 24,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 0,
			encodingType: Camera.EncodingType.JPEG,
			saveToPhotoAlbum: true,
			mediaType: Camera.MediaType.PICTURE,
			correctOrientation: true,
		});

		function onSuccess(imageData) {
			let image = "data:image/jpeg;base64," + imageData;
			removeDisabledClass("topLine");
			removeDisabledClass("bottomLine");
			removeDisabledClass("btnDownloadMeme");
			removeDisabledClass("btnUploadMeme");

			setAndUpdateImg(image);
		
		}

		function onFail() {
    		console.error("Internal log - Error: no se ha podido obtener la imagen");
		}

		async function setAndUpdateImg(image) {
			let img = document.getElementById("imgSelected");

			img.src = image;

			await sleep(24);

			await ctx.clearRect(0, 0, canvas.width, canvas.height);
			await ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		}
		
	});

	btnDownload = $("#btnDownloadMeme").on("click", function() {
		generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

		if (device.platform === "browser") {
			canvas.toBlob(function(blob) {
				saveAs(blob, "img_" + Date.now());
			});
		} else if (device.platform === "Android") {
			window.imageSaver.saveBase64Image({ data: generatedImage },
				function (filePath) {
					console.log('File saved on ' + filePath);
				},
				function (msg) {
					console.error(msg);
				}
			);
		}
		
	});

	btnUpload = $("#btnUploadMeme").on("click", function() {
		generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		console.log(generatedImage);
	});


	memeSearchInput = $("#btnUploadMeme").on("input", function() {});

	btnDownloadSelectedMeme = $("#btnDownloadSelectedMeme").on("click", function(){

	});

}

function getUserMemes() {
	try {
		$.ajax({
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
			url: 'https://meme-generator-jcg-jmm.herokuapp.com/user/findMemesByUsername/' + userData.username ? userData.username : "user",
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
	
		}).done(function (response) {
			userMemes = response;
			console.log(userMemes);
			setUserMemes();
		}).fail(function (response) {
			alert("Error con los datos del usuario" + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function setUserMemes() {
	for (let index = 0; index < userMemes.length; index++) {
		$("#userMemeList").append("<li>" + userMemes[index].rute + "</li>");
	}

}

function getMemesByName() {
	var memeName = $("#searchbarInput").val();
	$.ajax({
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		},
		url: 'https://meme-generator-jcg-jmm.herokuapp.com/user/findMemesByMemeName/' + memeName,
		contentType: "application/json",
		crossDomain: true,
		dataType: "json",

	}).done(function (response) {
		searchMemes = response;
		console.log(searchMemes);
		setSearchMemes();
	}).fail(function (response) {
		alert("Error durante la busqueda")
	});
}

function setSearchMemes() {
	$("#searchMemeList").empty();
	for (let index = 0; index < searchMemes.length; index++) {
		$("#searchMemeList").append("<li>" + searchMemes[index].rute + "</li>");
	}
}

function applyDisabledClass(id) {
    $("#" + id).addClass("disabled");
	$("#" + id).addAttr("disabled");
}

function removeDisabledClass(id) {
    $("#" + id).removeClass("disabled");
	$("#" + id).removeAttr("disabled");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
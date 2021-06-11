(function ($) {
	$(function () {
		var modalUpload = document.querySelectorAll('#modal1');
		M.Modal.init(modalUpload, {opacity: 0.5, dismissible: false});
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

let selectedFoundMeme;
let selectedUserMeme;

// Variables Tab Editor:
let btnSelect;
let btnUpload;
let btnDownload;
let btnDownloadSelectedMeme;
let btnDownloadSelectedUserMeme;
let memeSearchInput;
let memeUrl;
let memeName;
let route;
let memeID;

function onDeviceReady() {
	try {
		userData = JSON.parse(localStorage.getItem("userData"))[0];
		$('#lblUsername')[0].innerHTML = userData.username;
	} catch (error) {
		console.log("Internal log: Error - userData");
	}

	getUserMemes();

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
		
		
		
		
		console.log(generatedImage);
	});

	$("#btnAgree").on("click", function() {
		route = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		memeName = $("#saveName")[0].value;
		postImage(memeName,route);
	});


	memeSearchInput = $("#searchbarInput").on("input", function() {

		getMemesByName();
	});

	btnDownloadSelectedMeme = $("#btnDownloadSelectedMeme").on("click", function(){
		download();
		function toDataURL(url) {
			return fetch(url).then((response) => {
					return response.blob();
				}).then(blob => {
					return URL.createObjectURL(blob);
				});
		};
		
		async function download() {
			const a = document.createElement("a");
			a.href = await toDataURL(selectedFoundMeme);
			a.download = "myImage.png";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		};
	});

	btnDownloadSelectedUserMeme = $("#btnDownloadSelectedUserMeme").on("click", function(){
		download();
		function toDataURL(url) {
			return fetch(url).then((response) => {
					return response.blob();
				}).then(blob => {
					return URL.createObjectURL(blob);
				});
		};
		
		async function download() {
			const a = document.createElement("a");
			a.href = await toDataURL(selectedUserMeme);
			a.download = "myImage.png";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		};
	});

}

function postImage(memeName,route){
	var params ={
		title: memeName,
		image: route
	};
	try {
		$.ajax({
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			url: "https://meme-generator-jcg-jmm.herokuapp.com/image-upload/",
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify(params),
		}).done(function (response) {
			memeUrl = response.result.url;
			console.log(memeUrl);
			generateMeme();
		}).fail(function (response) {
			alert("Error con los datos del usuario" + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function generateMeme(){
	var params ={
		name: memeName,
		route: memeUrl
	};
	try {
		$.ajax({
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			url: "https://meme-generator-jcg-jmm.herokuapp.com/meme/create",
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify(params),
		}).done(function (response) {
			setMemeToUser();
		}).fail(function (response) {
			alert("Error con los datos del usuario" + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function setMemeToUser(){
	try {
		$.ajax({
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
			url: "https://meme-generator-jcg-jmm.herokuapp.com/meme/findMemeIdByMemeName/" + memeName,
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
			
		}).done(function (response) {
			memeID = response[0].idmeme;
			userData.idMeme = memeID;
			updateUser();
		}).fail(function (response) {
			alert("Error con los datos del usuario" + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function updateUser(){
	
	try {
		$.ajax({
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			url: "https://meme-generator-jcg-jmm.herokuapp.com/user/update/" + userData.username,
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify(userData),
		}).done(function (response) {
			getUserMemes();
		}).fail(function (response) {
			alert("Error con los datos del usuario" + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function getUserMemes() {
	try {
		$.ajax({
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Accept': '*/*'
			},
			url: 'https://meme-generator-jcg-jmm.herokuapp.com/meme/findMemesByUsername/' + userData.username,
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",
	
		}).done(function (response) {
			userMemes = response;
			console.log(userMemes);
			setUserMemes();
		}).fail(function (response) {
			alert("Error con los datos del usuario " + userData.username)
		});
	} catch (error) {
		console.log("Internal log: Error - userData");
	}
}

function setUserMemes() {
	for (let index = 0; index < userMemes.length; index++) {
		$("#userMemeList").append("<li><img name='userMemes' id=userMeme"+index+" src='"+ userMemes[index].rute + "' class='responsive-img'></li>");
	}
	$("[name=userMemes]").on("click",function(){
		console.log($(this).closest("li").attr("id"))
		selectedUserMeme = $(this).closest("li").children("img").attr("src");
		console.log(selectedUserMeme);
	});

}

function getMemesByName() {
	var memeName = $("#searchbarInput").val();
	try {
		$.ajax({
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
			url: 'https://meme-generator-jcg-jmm.herokuapp.com/meme/findMemesByMemeName/' + memeName,
			contentType: "application/json",
			crossDomain: true,
			dataType: "json",

		}).done(function (response) {
			searchMemes = response;
			console.log(searchMemes);
			setSearchMemes();
		}).fail(function (response) {
			
		});
	} catch (error) {
		
	}
}

function setSearchMemes() {
	$("#searchMemeList").empty();
	for (let index = 0; index < searchMemes.length; index++) {
		$("#searchMemeList").append("<li name='searchMemes' id=meme"+index+"><img src='"+ searchMemes[index].rute + "' class='responsive-img'></li>");
	}
	$("[name=searchMemes]").on("click",function(){
		console.log($(this).closest("li").attr("id"));
		selectedFoundMeme = $(this).closest("li").children("img").attr("src");
		console.log(selectedFoundMeme);
	});
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
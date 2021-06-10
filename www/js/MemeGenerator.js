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

// Variables
let userData;

let userMemes;
let searchMemes;

// Variables Tab Editor:
let btnSelect;
let btnUpload;
let btnDownload;

function onDeviceReady() {
	try {
		userData = JSON.parse(localStorage.getItem("userData"))[0];
		$('#lblUsername')[0].innerHTML = userData.username ? userData.username : "Usuario";
	} catch (error) {
		console.log("Internal log: Error - userData");
	}

	getUserMemes();

	$("#btnEditSelected").on("click", getMemesByName);
	
	btnSelect = $("#btnSelectMeme").on("click", function() {
		
	});

	btnUpload = $("#btnDownloadMeme").on("click", function() {
		
	});

	btnDownload = $("#btnUploadMeme").on("click", function() {
		
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
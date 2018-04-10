$( document ).ready(function() {
	$(".member-name").text(localStorage.getItem("Cache-ual-Corner"))
});


$("form.update").on("submit", function(event) 
{
	event.preventDefault();

	var updateData = {
		avatar_image:$("input:radio[name ='img']:checked").val(),
		message_color: $("#updateColor").val(),
		email: localStorage.getItem("Cache-ual-Corner"),
		logged: true
	}

	updateUserInfo(updateData)
})

function updateUserInfo(data) {
	localStorage.setItem("skinChoice", $("#skinChoice").val().trim());

	$.ajax({
		method : "PUT",
		url : "/api/update/",
		data : data
	}).then(
		window.location.replace("/chat")
	);
};


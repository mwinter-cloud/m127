
setTimeout(() => {
 if(window.Notification && Notification.permission !== "denied") {
	Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
	alert(1)
		var n = new Notification('Title', { 
			body: 'I am the body text!',
			icon: 'https://thecode.media/wp-content/themes/thecode_refresh/assets/svg/logo.svg' // optional
		}); 
	});
}
}, "1000");
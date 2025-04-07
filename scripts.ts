let monitoring = false;

function followCursorOn() {
	console.log("follow on", new Date().getTime());
	const trackpadEle = document.querySelector(".pad");
	trackpadEle?.addEventListener("mousemove", function (event) {
		const cursorX = event.clentX;
		const cursorY = event.clientY;
		const xEle = document.querySelector(".x");
		xEle!.textContent = cursorX;
		const yEle = document.querySelector(".y");
		yEle!.textContent = cursorY;
	});
}

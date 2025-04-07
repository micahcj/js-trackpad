let monitoring = false;
let cursorX = null;
let cursorY = null;
// const trackpadEle = document.querySelector(".pad");

function followCursorOn() {
	console.log("follow on", new Date().getTime());
	const trackpadEle = document.querySelector(".pad");
	trackpadEle?.addEventListener("mousemove", function (event) {
		monitoring = true;
		cursorX = event.clientX;
		cursorY = event.clientY;
		const xEle = document.querySelector(".x");
		xEle.textContent = cursorX;
		const yEle = document.querySelector(".y");
		yEle.textContent = cursorY;
		monitoring = setInterval(calculateDistance, 1000, cursorX, cursorY);
	});
}

function calculateDistance(x, y) {
	if (monitoring) {
		//sleep 100 milliseconds then get the values
		// console.log(x, y);
		const trackpadEle = document.querySelector(".pad");
		const computedStyle = window.getComputedStyle(trackpadEle);
		const height = Number(computedStyle.height.slice(0, -2));
		const width = Number(computedStyle.width.slice(0, -2));
		setTimeout(() => {
			const deltaX = cursorX - x;
			const deltaY = cursorY - y;
			console.log(deltaX, deltaY);
			const resultEle = document.querySelector(".delta");

			resultEle.textContent = `${(deltaX / width) * 100} x ${
				(deltaY / height) * 100
			}`;
		}, 1000);
	}
}

function followCursorOff() {
	monitoring = false;
}

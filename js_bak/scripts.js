let monitoring = false;
let cursorX = null;
let cursorY = null;
let counter = 0;
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
		drawOnCanvas(cursorX, cursorY);
	});
	monitoring = setInterval(calculateDistance, 100, cursorX, cursorY);
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
			// if (deltaX + deltaY < 25) {
			counter++;
			// }
			console.log(x, y);
			console.log("deltax:", deltaX, "deltay:", deltaY);
			const resultEle = document.querySelector(".delta");

			resultEle.textContent = `${(deltaX / width) * 100}% x ${
				(deltaY / height) * 100
			}%`;
		}, 100);
		console.log(counter);
		if (counter >= 5) {
			console.log("counter hit 5. closing interval");
			clearInterval(monitoring);

			monitoring = false;
		} else {
			console.log("counter", counter);
		}
	}
}

function followCursorOff() {
	if (monitoring) {
		try {
			clearInterval(monitoring);
		} catch (error) {
			console.log(error);
		}
	}
	monitoring = false;
}

function drawOnCanvas(x, y) {
	const canvas = document.querySelector(".myCanvas");
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "red";
	ctx.ellipse;
	ctx.fillRect(x, y, 15, 7.5);
	console.log("drew");
}

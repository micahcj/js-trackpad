let monitoring: boolean | number = false;
let cursorX = null;
let cursorY = null;
let counter = 0;
const canvas = document.querySelector(".myCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");
// ctx.globalCompositeOperation = "destination-out";
// const trackpadEle = document.querySelector(".pad");

function followCursorOn() {
	console.log("follow on", new Date().getTime());
	const trackpadEle = document.querySelector(".pad");
	trackpadEle?.addEventListener("mousemove", function (event: MouseEvent) {
		monitoring = true;
		const trackpadCoordinates = trackpadEle.getBoundingClientRect();
		cursorX = event.clientX;
		cursorY = event.clientY;
		cursorX -= trackpadCoordinates.x;
		cursorY -= trackpadCoordinates.y;
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
			const deltaX = cursorX! - x;
			const deltaY = cursorY! - y;
			// if (deltaX + deltaY < 25) {
			counter++;
			// }
			console.log(x, y);
			console.log("deltax:", deltaX, "deltay:", deltaY);
			const resultEle = document.querySelector(".delta");

			resultEle!.textContent = `${(deltaX / width) * 100}% x ${
				(deltaY / height) * 100
			}%`;
			if (deltaX / x > 0.2) {
				resultEle!.textContent += " right > ";
			}
			if (deltaX / x < -0.2) {
				resultEle!.textContent += " left > ";
			}
			if (deltaY / y > 0.2) {
				resultEle!.textContent += " down > ";
			}
			if (deltaY / y < -0.2) {
				resultEle!.textContent += " up > ";
			}
		}, 100);
		console.log(counter);
		if (counter >= 5) {
			console.log("counter hit 5. closing interval");
			clearInterval(monitoring as number);

			monitoring = false;
		} else {
			console.log("counter", counter);
		}
	}
}

function followCursorOff() {
	if (monitoring) {
		try {
			clearInterval(monitoring as number);
		} catch (error) {
			console.log(error);
		}
	}
	monitoring = false;
	const canvas = document.querySelector(".myCanvas") as HTMLCanvasElement;

	const ctx = canvas.getContext("2d");
	ctx.globalCompositeOperation = "destination-out";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// const canvas = document.querySelector(".myCanvas") as HTMLCanvasElement;

	// const ctx = canvas.getContext("2d");
	//ctx.globalCompositeOperation = "destination-out";
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawOnCanvas(x, y) {
	const canvas = document.querySelector(".myCanvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");
	// ctx.globalCompositeOperation = "copy";
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "red";
	ctx.ellipse(x, y, 30, 30, 0, 0, 0);
	// ctx.fillRect(x, y, 15, 7.5);
	ctx.stroke();
	// ctx.globalCompositeOperation = "destination-out";
	console.log("drew");
}

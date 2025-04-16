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
	monitoring = setInterval(function () {
		calculateDistance(cursorX, cursorY);
	}, 500);
}

/**sleep timeout milliseconds then get then calculate the distance traveled
 * @param x x-coordinate of cursor
 * @param y y-coordinate of cursor
 * @param timeout number of milliseconds until distance is calculated and command sent. Default 250 milliseconds
 */
function calculateDistance(x: number, y: number, timeout = 250) {
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
			// resultEle.innerHTML += "<br>";
			resultEle.appendChild(document.createElement("br"));
			const dX = document.createElement("p");
			dX.textContent = `deltaX: ${deltaX}`;
			const dY = document.createElement("p");
			dY.textContent = `deltaY: ${deltaY}`;
			const trackpadDimensions = Object(
				trackpadEle.getBoundingClientRect()
			);
			const details = document.querySelector(".data");
			details.replaceChildren();
			details.appendChild(dX);
			details.appendChild(dY);
			const cursorXP = document.createElement("p");
			cursorXP.textContent = "cursor X: " + cursorX;
			const cursorYP = document.createElement("p");
			cursorYP.textContent = "cursor Y: " + cursorY + "  y: " + y;
			details.appendChild(cursorXP);
			details.appendChild(cursorYP);
			// 	trackpadDimensions.key.forEach((key) => {
			console.log(details.childNodes.length);
			for (const item in trackpadDimensions) {
				const p = document.createElement("p");
				p.textContent = item + " : " + trackpadDimensions[item];
				details.appendChild(p);
			}
			let result: "left" | "right" | "up" | "down" | null;
			if (deltaX / x > 0.1) {
				resultEle!.textContent += " right > ";
				result = "right";
			}
			if (deltaX / x < -0.1) {
				resultEle!.textContent += " left > ";
				result = "left";
			}
			if (deltaY / y > 0.1) {
				resultEle!.textContent += " down > ";
				result = "down";
			}
			if (deltaY / y < -0.1) {
				resultEle!.textContent += " up > ";
				result = "up";
			}
			if (result) {
				sendInput(result);
				console.log("result", result);
			}
		}, timeout);
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
	// ctx.ellipse(x, y, 30, 30, 0, 0, 0);
	ctx.fillRect(x, y, 15, 7.5);
	// ctx.stroke();
	ctx.globalCompositeOperation = "destination-out";
	console.log("drew");
}

async function sendInput(cardinalInput: "left" | "right" | "up" | "down") {
	const url = new URL("http://192.168.0.120:9099/remoteinput");
	const formData = new FormData();
	formData.append("remoteInput", cardinalInput);
	const response = await fetch(url, {
		body: formData,
		method: "POST",
	});
	const data = await response.json();
	console.log(data);
}

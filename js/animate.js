document.addEventListener("DOMContentLoaded", async function () {
	const loaderElement = document.querySelector("#loader");
	await loader(loaderElement);

	// ==== наблюдатель ======
	const config = {
		attributes: true,
	};

	const callback = async function (mutationsList, observer) {
		for (let mutation of mutationsList) {
			if (mutation.type === "attributes") {
				if (mutation.target.classList.contains("loader--hide")) {
					const pathsSvg = [];
					const animate_container = document.querySelector("#animate");
					await create(pathsSvg, animate_container);
					const images = document.querySelectorAll(".svg-item");
					if (images.length * 5 === pathsSvg.length) {
						await startAnimate(images, pathsSvg);
					}
				}
			}
		}
	};
	const observer = new MutationObserver(callback);
	observer.observe(loaderElement, config);
	// ==== наблюдатель ======
});

async function create(pathsSvg, animate_container) {
	for (let i = 0; i < 260; i++) {
		pathsSvg.push(`images/icon${i + 1}.png`);
	}

	for (let i = 0; i < pathsSvg.length / 5; i++) {
		let step = 0;
		if (step < pathsSvg.length - 1) {
			step = i * 5;
		} else {
			step = pathsSvg.length;
		}
		const img = new Image();
		img.src = pathsSvg[step];
		img.setAttribute("class", `svg-item-${i} svg-item`);
		img.setAttribute("alt", "amimation");
		animate_container.appendChild(img);
	}
}

async function startAnimate(images, pathsSvg) {
	let count = 0;
	const timeId = setInterval(() => {
		if (count === pathsSvg.length) {
			count = pathsSvg.length - 1;
			clearTimeout(timeId);
		} else {
			count = count + 1;
		}
		images[count - 1]?.classList.remove("svg-item--show");
		images[count]?.classList.add("svg-item--show");
	}, 60);
}

async function loader(loaderElement) {
	setTimeout(() => {
		loaderElement.classList.add("loader--hide");
	}, 3000);
}

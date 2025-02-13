/** @format */

const clear = document.getElementById("clear");
const boxes = document.querySelectorAll(".box");
const colorInput = document.getElementById("colorPicker");
const save = document.getElementById("save");
const border = document.getElementById("border");
const check = document.getElementById("check");

// 🎨 Changer la couleur de fond des boîtes
boxes.forEach((box) => {
	box.addEventListener("click", () => {
		let currentBg = window.getComputedStyle(box).backgroundColor;
		console.log(currentBg);
		if (currentBg == "rgb(255, 255, 255)") {
			box.style.backgroundColor = "var(--clr-active)";
			box.style.borderColor = border.checked
				? "skyblue"
				: "var(--clr-active)";
		} else {
			box.style.backgroundColor = "rgb(255, 255, 255)";
			box.style.borderColor = border.checked
				? "skyblue"
				: "var(--clr-active)";
		}
	});
});

// 📏 Ajuster la largeur des boîtes pour correspondre à leur hauteur
boxes.forEach((box) => {
	let heightValue = parseFloat(window.getComputedStyle(box).height);
	box.style.width = heightValue + "px";
});

// ✏️ Activer/Désactiver les bordures
border.addEventListener("change", () => {
	check.textContent = border.checked
		? "Lignes activées"
		: "Lignes désactivées";
	boxes.forEach((box) => {
		let currentBg = window.getComputedStyle(box).backgroundColor;
		box.style.borderColor = border.checked
			? "skyblue"
			: currentBg === "rgb(255, 255, 255)"
			? "skyblue"
			: "var(--clr-active)";
	});
});

// 💾 Sauvegarder la couleur sélectionnée
save.addEventListener("click", () => {
	let selectedColor = colorInput.value;
	document.documentElement.style.setProperty("--clr-active", selectedColor);
});

//Capture d'écran
document.getElementById("capture-btn").addEventListener("click", function () {
	const captureZone = document.getElementById("all-boxes");

	html2canvas(captureZone)
		.then((canvas) => {
			// Convertit le canvas en une image PNG
			const imageURL = canvas.toDataURL("image/png");
			// Crée un lien de téléchargement
			const downloadButton = document.getElementById("download-button");
			downloadButton.style.display = "block";

			downloadButton.addEventListener("click", function () {
				const a = document.createElement("a");
				a.href = imageURL;
				a.download = "Pexel.png";
				a.click();
			});
		})
		.catch((error) => {
			console.error("Erreur lors de la capture :", error);
			alert("Une erreur est survenue lors de la capture !");
		});
});

// Tout supprimer
clear.addEventListener("click", () => {
	let clearConfirm = confirm("Voulez-vous vraiment tout supprimer ?");
	if (clearConfirm) {
		boxes.forEach((box) => {
			box.style.backgroundColor = "rgb(255, 255, 255)";
		});
	}
});

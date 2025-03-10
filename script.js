/** @format */

//Déclaration des variables
const boxes = document.querySelectorAll(".box");
const clear = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const save = document.getElementById("save");
const border = document.getElementById("border");
const captureBtn = document.getElementById("capture-btn");
const downloadButton = document.getElementById("download-button");
const adjustName = document.getElementById("adjust-name");
const config = document.getElementById("config");

//Set Name
let imgName = "pixel-art"; // Valeur par défaut
adjustName.addEventListener("click", () => {
	imgName = prompt("Sous quel nom voulez-vous enregistrer votre image ?");
	if (!imgName) imgName = "pixel-art"; // Évite un nom vide
});

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
			box.style.borderColor = "skyblue";
		}
	});
});

// 📏 Ajuster la largeur des boîtes pour correspondre à leur hauteur
function ajusterTaille() {
	boxes.forEach((box) => {
		let heightValue = parseFloat(window.getComputedStyle(box).height);
		box.style.width = heightValue + "px";
	});
}
ajusterTaille();
window.addEventListener("resize", ajusterTaille);

// ✏️ Activer/Désactiver les bordures
border.addEventListener("change", () => {
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
colorPicker.addEventListener("change", () => {
	let selectedColor = colorPicker.value;
	document.documentElement.style.setProperty("--clr-active", selectedColor);
});

//Capture d'écran
captureBtn.addEventListener("click", function () {
	const captureZone = document.getElementById("all-boxes");
	html2canvas(captureZone)
		.then((canvas) => {
			// Convertit le canvas en une image PNG
			const imageURL = canvas.toDataURL("image/png");
			// Crée un lien de téléchargement
			const a = document.createElement("a");
			a.href = imageURL;
			a.download = (imgName || "pixel-art") + ".png";
			a.click();
			downloadButton.style.display = "none";
			downloadButton.style.backgroundColor = "var(--clr-active)";
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
			box.style.borderColor = "skyblue";
		});
	}
});

//Gestion des cliques sur le bouton de téléchargement
downloadButton.addEventListener("click", () => {
	downloadButton.style.backgroundColor = "#576067";
	if (config.value == "config2") {
		downloadButton.style.display = "none";
	}
});

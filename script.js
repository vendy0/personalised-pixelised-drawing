/** @format */

const boxes = document.querySelectorAll(".box");
const clear = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const save = document.getElementById("save");
const border = document.getElementById("border");
const check = document.getElementById("check");
const downloadButton = document.getElementById("download-button");
const adjustName = document.getElementById("adjust-name");
const config = document.getElementById("config");

//Set Name
let imgName = "pixel-art"; // Valeur par défaut
adjustName.addEventListener("click", () => {
	imgName =
		prompt("Sous quel nom voulez-vous enregistrer votre image ?") ||
		"pixel-art";
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
colorPicker.addEventListener("change", () => {
	let selectedColor = colorPicker.value;
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
			downloadButton.style.display = "block";
			downloadButton.style.backgroundColor = "var(--clr-active)";

			// Supprimer l'ancien écouteur pour éviter l'empilement
			downloadButton.replaceWith(downloadButton.cloneNode(true));
			const newDownloadButton =
				document.getElementById("download-button");

			// Ajouter un nouvel écouteur
			newDownloadButton.addEventListener(
				"click",
				function () {
					this.style.backgroundColor =
						"rgba(87,96,103,1)";
					if (config.value === "config2") {
						this.style.display = "none";
					}
					const a = document.createElement("a");
					a.href = imageURL;
					a.download = (imgName || "pixel-art")+ ".png";
					a.click();
				},
				{once: true}
			);
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

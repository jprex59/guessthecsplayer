// Charger les données JSON
fetch("bdd.json")
	.then((response) => response.json())
	.then((data) => {
		const joueurs = data.joueurs;
		const tableBody = document.querySelector("#result-table tbody");

		function getRandomJoueur(joueurs) {
			const randomIndex = Math.floor(Math.random() * joueurs.length);
			return joueurs[randomIndex];
		}

		const randomJoueur = getRandomJoueur(joueurs);
		console.log("Joueur aléatoire : ", randomJoueur);

		// Écouter les événements de saisie de l'utilisateur
		const searchBox = document.getElementById("search-box");
		searchBox.addEventListener("input", (event) => {
			const searchString = event.target.value.toLowerCase(); // convertir la chaîne de recherche en minuscules

			// Filtrer les données JSON en fonction de la chaîne de recherche non sensible à la casse
			const filteredJoueurs = joueurs.filter((joueur) => joueur.nom.toLowerCase().includes(searchString));

			// remplira le contenu de la barre de recherche avec le texte du "li" correspondant
			function onLiClick(li) {
				const searchBox = document.getElementById("search-box");
				searchBox.value = li.textContent;
			}

			// Afficher les résultats dans la zone de résultats
			const resultList = document.createElement("ul");
			filteredJoueurs.forEach((joueur) => {
				const listItem = document.createElement("li");
				listItem.textContent = joueur.nom;
				listItem.addEventListener("click", () => onLiClick(listItem));
				resultList.appendChild(listItem);
			});

			const resultsContainer = document.getElementById("results-container");
			resultsContainer.innerHTML = "";
			resultsContainer.appendChild(resultList);
		});

		const input = document.getElementById("search-box");
		const resultsContainer = document.getElementById("results-container");

		input.addEventListener("keypress", function (event) {
			// Show the results container
			resultsContainer.style.display = "block";
			// Stop the event from bubbling up to the document
			event.stopPropagation();
		});

		// Add click event listener to document to hide results container
		document.addEventListener("click", function () {
			// Hide the results container
			resultsContainer.style.display = "none";
		});
		// Ajouter une nouvelle ligne avec les champs correspondants lors du clic sur le bouton Ajouter
		const addButton = document.querySelector(".button");
		addButton.addEventListener("click", () => {
			const searchString = searchBox.value.toLowerCase(); // convertir la chaîne de recherche en minuscules
			const filteredJoueurs = joueurs.filter((joueur) => joueur.nom.toLowerCase().includes(searchString));

			if (filteredJoueurs.length > 0) {
				const joueur = filteredJoueurs[0];

				const newRow = tableBody.insertRow();
				const nomCell = newRow.insertCell();
				const nationaliteCell = newRow.insertCell();
				const armeCell = newRow.insertCell();
				const teamCell = newRow.insertCell();
				const nbMajorCell = newRow.insertCell();

				nomCell.textContent = joueur.nom;
				nationaliteCell.textContent = joueur.nationalité;
				armeCell.textContent = joueur.arme;
				teamCell.textContent = joueur.team;
				nbMajorCell.textContent = joueur.nb_major_participes;

				searchBox.value = "";
				resultsContainer.innerHTML = "";
			}
		});
	});
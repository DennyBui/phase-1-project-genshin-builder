function createCardElement(character) {
  let card = document.createElement('div');
  card.classList.add('card');
  let h2 = document.createElement('h2');
  h2.textContent = character.name;
  let p = document.createElement('p');
  p.textContent = `Rarity: ${character.rarity}`;
  let img = document.createElement('img');
  img.src = character.image;
  img.classList.add("character-portrait");
  let button = document.createElement('button');
  button.textContent = "Build Character";
  button.id = character.id;
  button.classList.add('build-character');
  button.classList.add('active');
  card.append(h2, img, p, button);

  button.addEventListener("click", () => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
      button.textContent = "Build Character";
      let recommendedArtifacts = card.querySelectorAll('.recommended-artifact-image, .artifact-name, .recommended-artifact-description, .recommended-artifact-four');
      recommendedArtifacts.forEach(element => element.remove());
      p.textContent = `Rarity: ${character.rarity}`;
    } else {
      button.classList.add('active');
      button.textContent = "Hide Artifacts";
      p.textContent = "Recommended";
      character.recommendedArtifacts.forEach(artifact => {
        let artifactImg = document.createElement("img");
        artifactImg.src = artifact['artifact-image'];
        artifactImg.alt = artifact.name;
        artifactImg.classList.add('recommended-artifact-image');
        card.appendChild(artifactImg);
        let artifactName = document.createElement("h3");
        artifactName.textContent = artifact.name;
        artifactName.classList.add('artifact-name');
        card.appendChild(artifactName);
        let artifactDesc = document.createElement('p');
        artifactDesc.textContent = artifact.description;
        artifactDesc.classList.add('recommended-artifact-description');
        card.appendChild(artifactDesc);
        let artifactFour = document.createElement('p');
        artifactFour.textContent = artifact.fourPC;
        artifactFour.classList.add('recommended-artifact-four');
        card.appendChild(artifactFour);
        return card;
      });
    }
  });

  document.getElementById('cards-container').appendChild(card);
}

fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(characters => {
      characters.forEach(character => createCardElement(character));
     
    });
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  searchCharacter(searchTerm);
});

function searchCharacter(name) {
  fetch(`http://localhost:3000/characters?name=${name}`)
    .then(res => res.json())
    .then(characters => {
      displayCharacters(characters);
    })
    .catch(error => {
      console.error('Error fetching characters:', error);
    });
}

function displayCharacters(characters) {
  const cardsContainer = document.getElementById('cards-container');
  const cards = cardsContainer.querySelectorAll('.card');
  cards.forEach(card => {
    const characterName = card.querySelector('h2').textContent.toLowerCase();
    if (characters.some(character => character.name.toLowerCase() === characterName)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}


function getArtifacts(recommendArtifacts) {
  fetch(`http://localhost:3000/artifacts/${recommendArtifacts}`)
    .then(res => res.json())
    .then(artifact => {
      displayArtifact(artifact);
    })
    .catch(error => {
      console.error('Error fetching artifacts:', error);
    });
}
function displayArtifact(artifact) {
  const parentElement = searchResults;
  const allChildElements = parentElement.children;

  // Hide all the child elements (i.e. character cards)
  for (let i = 0; i < allChildElements.length; i++) {
    allChildElements[i].style.display = 'none';
  }

  const artifactCard = document.createElement('div');
  artifactCard.classList.add('card');
  let h2 = document.createElement('h2');
  h2.textContent = artifact.name;
  let p = document.createElement('p');
  p.textContent = artifact.description;
  let img = document.createElement('img');
  img.src = artifact.image;
  img.classList.add("artifact-image");
  let button = document.createElement('button');
  button.textContent = "Build Character";
  button.addEventListener("click", () => {
    const characterCard = document.querySelector(`.card[id='${artifact.characterId}']`);
    const p = characterCard.querySelector('p');
    p.textContent = "Recommended";
    artifact.recommendedCharacters.forEach(characterId => {
      const recommendedCharacterButton = characterCard.querySelector(`.build-character[id='${characterId}']`);
      recommendedCharacterButton.click();
    });
  });
  button.classList.add('build-character');
  button.id = artifact.id;
  artifactCard.append(h2, img, p, button);
  parentElement.appendChild(artifactCard);

  // Show the artifact card
  const artifactElement = document.getElementById(artifact.id);
  artifactElement.style.display = 'block';
}


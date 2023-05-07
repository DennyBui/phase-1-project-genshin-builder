document.addEventListener('DOMContentLoaded', () => {
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
    button.addEventListener("click", () => {
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
      });  
    });
    button.classList.add('build-character');
    button.id = character.id;
    card.append(h2, img, p, button);
    document.getElementById('cards-container').appendChild(card);
  }

fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(characters => {
      characters.forEach(character => createCardElement(character));
     
    });
});
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTerm = searchInput.value;
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
  searchResults.textContent = '';
  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.classList.add('card');
    let h2 = document.createElement('h2');
    h2.textContent = character.name;
    let p = document.createElement('p');
    p.textContent = `Rarity: ${character.rarity}`;
    let img = document.createElement('img');
    img.src = character.image;
    img.classList.add("character-portrait");
    let button = document.createElement('button');
    button.textContent = "Build Character";
    button.addEventListener("click", () => {
      p.textContent = "Recommended";
      character.recommendedArtifacts.forEach(artifact => {
        let artifactImg = document.createElement("img");
        artifactImg.src = artifact['artifact-image'];
        artifactImg.alt = artifact.name;
        artifactImg.classList.add('recommended-artifact-image');
        characterCard.appendChild(artifactImg);
        let artifactName = document.createElement("h3");
        artifactName.textContent = artifact.name;
        artifactName.classList.add('artifact-name');
        characterCard.appendChild(artifactName);
        let artifactDesc = document.createElement('p');
        artifactDesc.textContent = artifact.description;
        artifactDesc.classList.add('recommended-artifact-description');
        characterCard.appendChild(artifactDesc);
        let artifactFour = document.createElement('p');
        artifactFour.textContent = artifact.fourPC;
        artifactFour.classList.add('recommended-artifact-four');
        characterCard.appendChild(artifactFour);
      });  
    });
    button.classList.add('build-character');
    button.id = character.id;
    characterCard.append(h2, img, p, button);
    searchResults.appendChild(characterCard);
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
  searchResults.textContent = '';
  const artifactCard = document.createElement('div');
  artifactCard.classList.add('card');
  let h2 = document.createElement('h2');
  h2.textContent = artifact.name;
  let p = document.createElement('p');
  p.textContent = artifact.description;
  let img = document.createElement('img');
  img.src = artifact.image;
  img.classList.add("artifact-image");
  artifactCard.append(h2, img, p);
  searchResults.appendChild(artifactCard);
}


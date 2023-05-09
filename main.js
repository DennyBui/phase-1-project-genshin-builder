function createCardElement(character) {
  let card = document.createElement('div');
  card.classList.add('card');
  let h2 = document.createElement('h2');
  h2.textContent = character.name;
  let p = document.createElement('p');
  p.textContent = `Rarity: ${character.rarity} | Element: ${character.element}`;
  let elementImg = document.createElement('img')
  elementImg.src = character.elementImage
  card.append(elementImg)
  elementImg.classList.add('element-image')
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
      p.textContent = `Rarity: ${character.rarity} | Element: ${character.element}`;
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
    function submitSearch() {
      const input = document.getElementById('search-input').value;
      const cards = document.querySelectorAll('.card');
    //searches character by name and will display only that character
      cards.forEach(card => {
        const name = card.querySelector('h2').textContent;
        if (name.toLowerCase().includes(input.toLowerCase())) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior
  submitSearch();
});


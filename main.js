fetch("http://localhost:3000/characters")
.then(resp => resp.json())
.then(characters => {
    console.log(characters)
})
.catch(error => console.log(error));
// Function to update the cards container with filtered characters and artifacts
function updateCardsContainer(characters) {
    const cardsContainer = document.getElementById('cards-container');
    const searchInputValue = document.getElementById('character-search').value.toLowerCase();
  
    // Remove existing cards from the container
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  
    // Filter characters based on search input and create new card elements
    characters.forEach(character => {
      if (character.name.toLowerCase().includes(searchInputValue)) {
        const characterCard = document.createElement('div');
        characterCard.classList.add('card');
  
        const characterImage = document.createElement('img');
        characterImage.src = character.image;
        characterImage.alt = character.name;
        characterCard.appendChild(characterImage);
  
        const characterName = document.createElement('h2');
        characterName.textContent = character.name;
        characterCard.appendChild(characterName);
  
        const recommendedArtifactsHeader = document.createElement('h3');
        recommendedArtifactsHeader.textContent = 'Recommended Artifacts:';
        characterCard.appendChild(recommendedArtifactsHeader);
  
        const recommendedArtifacts = character.recommended_artifacts;
        recommendedArtifacts.forEach(artifact => {
          const artifactCard = document.createElement('div');
          artifactCard.classList.add('card');
  
          const artifactImage = document.createElement('img');
          artifactImage.src = artifact.image;
          artifactImage.alt = artifact.name;
          artifactCard.appendChild(artifactImage);
  
          const artifactName = document.createElement('h3');
          artifactName.textContent = artifact.name;
          artifactCard.appendChild(artifactName);
  
          const artifactDescription = document.createElement('p');
          artifactDescription.textContent = artifact.description;
          artifactCard.appendChild(artifactDescription);
  
          const artifactMainStat = document.createElement('p');
          artifactMainStat.textContent = 'Main stat: ' + artifact.main_stat;
          artifactCard.appendChild(artifactMainStat);
  
          const artifactSubstat = document.createElement('p');
          artifactSubstat.textContent = 'Substat: ' + artifact.substat;
          artifactCard.appendChild(artifactSubstat);
  
          characterCard.appendChild(artifactCard);
        });
  
        cardsContainer.appendChild(characterCard);
      }
    });
  }
  
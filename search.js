// search.js

document.getElementById('searchButton').addEventListener('click', searchSongs);
document.getElementById('searchBar').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchSongs();
  }
});

function searchSongs() {
  const query = document.getElementById('searchBar').value;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.results);
      toggleSvgPlaceholderVisibility(data.results.length === 0);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayResults(songs) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (songs.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('result-item');
    
    songElement.innerHTML = `
      <img src="${song.artworkUrl100}" alt="${song.trackName}" width="100" height="100">
      <div>
        <h3>${song.trackName}</h3>
        <p>Artist: ${song.artistName}</p>
        <p>Album: ${song.collectionName}</p>
        <div class="playbar">
          <audio controls>
            <source src="${song.previewUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    `;
    
    resultsContainer.appendChild(songElement);
  });
}

function toggleSvgPlaceholderVisibility(noResults) {
  const svgPlaceholder = document.querySelector('.svg-placeholder');
  if (noResults) {
    svgPlaceholder.classList.remove('results-visible');
  } else {
    svgPlaceholder.classList.add('results-visible');
  }
}

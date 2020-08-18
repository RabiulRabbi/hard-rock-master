const form = document.getElementById('form');
const apiUrl = 'https://api.lyrics.ovh';
const allItems = document.getElementById('all-items');
allItems.style.display = 'none';
form.addEventListener('click', function () {
  const search = document.getElementById('search');
  const searching = search.value.trim();
  allItems.style.display = 'block';

  if (!searching) {
    alert('Please try again!!')
  } else {
    searchSongs(searching);
  }

})

function searchSongs(song) {
  fetch(`${apiUrl}/suggest/${song}`).then(res => res.json()).then(data => showData(data))
}

function showData(resultIds) {

  const resultIdsValue = Object.values(resultIds);
  const resultIds1stValue = resultIdsValue[0];
  let lyrics = 'lyrics';
  let author = 'author';
  let number = 0;

  const slice = resultIds1stValue.slice(0, 10);
  const albumTitle = slice.map(d => d.album.title);
  const artistName = slice.map(d => d.artist.name);
  const resultIdLink = slice.map(d => d.link);

  for (let i = 0; i < 10; i++) {
    number += 1;
    let lyricsNumber = lyrics + number;
    let authorNumber = author + number;
    const lyricsId = document.getElementById(lyricsNumber);
    lyricsId.innerHTML = `${albumTitle[i]}`;
    const authorId = document.getElementById(authorNumber);
    authorId.innerHTML = `${artistName[i]}`;
    let resultId = document.getElementById('result' + number);
    var anchor = document.createElement('a');
    var link = document.createTextNode("Click here");
    anchor.appendChild(link);
    anchor.target = '_blank';
    anchor.href = resultIdLink[i];
    resultId.append(anchor);

    function showLyrics(artist, song) {
      fetch(`${apiUrl}/v1/${artist}/${song}`).then(res => res.json()).then(data => showResult(data))
    }

    function showResult(lyrics) {
      if ((!lyrics.lyrics)) {
        const songTitle = document.getElementById('song-title');
        songTitle.innerText = albumTitle[i];
        const songLyrics = document.getElementById('song-lyrics');
        songLyrics.innerText = 'Error!! No lyrics Found.';
        alert('Error!! No lyrics Found.');

      } else {
        allItems.style.display = 'block';
        number += 1;
        const resultNumber = document.getElementById('result' + number);
        const songTitle = document.getElementById('song-title');
        const songLyrics = document.getElementById('song-lyrics');
        songTitle.innerText = albumTitle[i];
        const lyricsSong = lyrics.lyrics;
        songLyrics.innerText = lyricsSong;
      }
    }
    document.getElementById('btn' + number).addEventListener('click', function () {
      showLyrics(artistName[i], albumTitle[i]);
    })
  }
}
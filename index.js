const input = document.getElementById("input");
const submit = document.getElementById("submit");
const selector = document.getElementById('main');

const loadMovies = () => {
  const url = `http://www.omdbapi.com/?s=${input.value}&page=2&apikey=ff461133`

  fetch(url, {
    method: "POST",
  })
  fetch(url).then((response) =>
    response.json().then((data) => {
      selector.innerHTML = "";
      movieInfo(data);
    ;}))
    .catch((error) => console.error('error:', error));
  };

const movieInfo = (data) => {
  const dataArray = data.Search;
  dataArray.forEach( (item) => {
    const image = item.Poster;
    const title = item.Title;
    const date = item.Year;
    const id = item.imdbID;

    showMovie(selector, image, title, date, id);
  });
};

submit.addEventListener('click', () => {
  loadMovies();
});

const showMovie = (selector, image, title, date, id) => {
  selector.innerHTML += `
  <div id="card">
    <img src="${image}" id="img">
    <h5">${title}</h5>
    <p>${date}</p>
    <button id="learnMore" onclick="showLearnMore('${id}')">Plus d'infos</button>
  </div>
  `
}

const showLearnMore =  async function (id) {
  const urlById = await fetch(`http://www.omdbapi.com/?i=${id}&page=2&apikey=ff461133`)
  const movieDetails = await urlById.json();
  const image = movieDetails.Poster;
  const title = movieDetails.Title;
  const date = movieDetails.Year;
  const plot = movieDetails.Plot;
  
  try {
    selector.innerHTML = "";
    modal(selector, image, title, date, plot);
  } catch (error) {
    console.error("error : ", error)
  }
};

const modal = (selector, image, title, date, plot) => {
  selector.innerHTML += `
  <img src="${image}" id="img">
  <h5>${title}</h5>
  <p>${date}</p>
  <p>${plot}</p>
  `
}
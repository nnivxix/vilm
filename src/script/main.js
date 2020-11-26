const baseUrl = null;
const keyAPI = '6d2a752d654f74f846c06dc403b1dee6';
const imgAPI = 'https://image.tmdb.org/t/p/original';
// backdrop_path image is 1:1
// poster_path image is 9:16
const trendMovie = 'https://api.themoviedb.org/3/trending/movie/day?api_key=6d2a752d654f74f846c06dc403b1dee6';
const header = document.querySelector('header');






	//data film trending ---dimulai...
function trendNow(){
	function moviePosters(film){
		return film.map(filmlist => {
			return `
			<div class="cardList">
			<section>
			<img src="${imgAPI+filmlist.poster_path}" alt="">
			</section>
			<section class="ditel">
			<p class="judul">${filmlist.title}</p>
			<p class="rate"> <i class="fa fa-star" aria-hidden="true"></i> ${filmlist.vote_average}</p>
			</section>
		</div>
			`
		})
	}
	function cards(film){
	const filmEl = document.createElement('div');
	filmEl.setAttribute('class', 'cards');
	const filmTemplate = moviePosters(film);
	filmEl.innerHTML += filmTemplate;
	return filmEl;
	}

	fetch(trendMovie)
		.then(res => res.json())
		.then(data => {
			const film = data.results;
			console.log(film);
			const filmCards = cards(film);
			header.appendChild(filmCards);
	})
}
//data film trending ---diakhiri...
export default  trendNow ;






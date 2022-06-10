const API_TOKEN = "d8472ade6d9d6af33d55519cc2440ab2"

text = "The Batman"

function getFilms(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

result = {}

function processData(data) {
    first_results = []
    results = data.results

    result = {
        'year': results[0].release_date, 'overview': results[0].overview, 'rating': results[0].vote_average,
        'path': 'https://image.tmdb.org/t/p/original' + results[0].poster_path
    }

    document.getElementById('year').innerHTML = result.year
    document.getElementById('rating').innerHTML = result.rating
    document.getElementById('overview').innerHTML = result.overview

    document.getElementById('img_film').src = result.path
}

getFilms(text).then(processData)

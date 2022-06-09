function processEtoile(img) {

    id = img.getAttribute('data-monid')

    if ((localStorage.getItem(id))) {
        img.src = 'assets/etoile vide.png'
        localStorage.removeItem(id)
    }

    else {
        img.src = "assets/etoile.png"
        obj = { 'title': img.getAttribute('data-title'), 'id': id, 'path': img.getAttribute('data-path') }
        console.log(obj)
        localStorage.setItem(id, JSON.stringify(obj))
    }
}



const API_TOKEN = "d8472ade6d9d6af33d55519cc2440ab2"

function getFilms(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

first_results = []
nb_films = 5

function processData(data) {
    first_results = []
    results = data.results
    n = results.length
    nb_films_max = Math.min(nb_films, n)
    for (let i = 0; i < nb_films_max; i++) {
        film = {
            'title': results[i].title, 'overview': results[i].overview, 'language': results[i].original_language,
            'note': results[i].vote_average, 'poster_path': 'https://image.tmdb.org/t/p/original/' + results[i].poster_path,
            'date': results[i].release_date, 'id': results[i].id
        }

        first_results.push(film)
    }
}



function updateButton() {
    champ_text = document.getElementById('champ_text')
    text = champ_text.value
    getFilms(text).then(processData)

    new_part = '<h1>Résultats de la recherche</h1> \
                    <section> \
                    <div id="res_recherche"> \
                    <div class="blank"></div>'

    n = first_results.length

    for (let i = 0; i < n; i++) {
        src = "assets/etoile vide.png"
        id = first_results[i].id.toString()
        if (localStorage.getItem(id)) {
            src = "assets/etoile.png"
        }

        new_film = '<div class="element_4"> \
        <h2>' + first_results[i].title + '</h2><img src=' + first_results[i].poster_path + ' width="70%"> \
        <img src="' + src + '" onclick="processEtoile(this)" width="15%" data-monid="' + id + '" data-title="' + first_results[i].title + '" data-path="' + first_results[i].poster_path + '" /> \
        </div>'

        new_part += new_film
    }

    new_part += '<div class="blank"></div>'

    // await sessionStorage.setItem("recherches_resultats", new_part);

    recherches = document.getElementById('recherches')
    recherches.innerHTML = ''
    recherches.innerHTML = new_part

    // location.href = 'recherche.html';

}

window.onload = function () {
    var button = document.getElementById('button');
    button.addEventListener('click', updateButton);
}





// Ici c'est pour mettre les étoiles jaunes quand c'est nécessaire sur les recommandations, mais ça ne marche pas
function changeStars() {
    images = document.getElementsByClassName('img_etoile')

    n = document.getElementsByClassName('img_etoile').length
    console.log(n)

    for (let i = 0; i < n; i++) {
        img = images[i].getAttribute('data-monid')
        console.log(img)
    }
}
 /*
Ce code fonctionne pour afficher les étoiles, mais il fait bugger le truc de recherche
window.onload = function () {
images = document.getElementsByClassName('img_etoile')

n = document.getElementsByClassName('img_etoile').length

for (let i = 0; i < n; i++) {
img = images[i]
id = img.getAttribute('data-monid')
if (localStorage.getItem(id)) {
    img.src = 'assets/etoile.png'
}
}

}
*/
// changeStars()




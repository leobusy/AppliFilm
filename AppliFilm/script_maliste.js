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




function containNumbers(s) {
    n = s.length
    for (let i = 0; i < n; i++) {
        if (s[i] != '0' && s[i] != '1' && s[i] != '2' && s[i] != '3' && s[i] != '4' && s[i] != '5' && s[i] != '6' && s[i] != '7' && s[i] != '8' && s[i] != '9') {
            return false
        }
    }
    return true
}

window.onload = function () {
    liste = document.getElementById('reco')

    liste_objets = []

    for (var key in localStorage) {
        if (containNumbers(key)) {
            a = JSON.parse(localStorage.getItem(key))
            if (typeof (a) != 'number') {
                liste_objets.push(a)
            }
        }

    }

    console.log(liste_objets)

    new_part = ''

    n = liste_objets.length


    for (let i = 0; i < n; i++) {

        src = "assets/etoile.png"

        new_film = '<div class="element_9"> \
        <a data-title="' + liste_objets[i].title +'" href="description_film.html" onclick="storeFilm(this)" class="element_4">\
        <h2>' + liste_objets[i].title + '</h2><img src=' + liste_objets[i].path + ' width="50%"></a>\
        <img src="' + src + '" onclick="processEtoile(this)" width="7%" data-monid="' + liste_objets[i].id + '" data-title="' + liste_objets[i].title + '" data-path="' + liste_objets[i].path + '"   /> \
        </div>'

        new_part += new_film
    }



    liste.innerHTML = ''
    liste.innerHTML = new_part
}
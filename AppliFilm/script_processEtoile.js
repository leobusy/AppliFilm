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
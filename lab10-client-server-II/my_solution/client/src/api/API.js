const url = "http://localhost:3000"

export async function getAllFilms() {
    const response = await fetch(`${url}/films`)
    const films = await response.json()
    return films
}

export async function getFavoriteFilms() {
    const response = await fetch(`${url}/favoriteFilms`)
    const films = await response.json()
    return films
}

export async function getBestFilms() {
    const response = await fetch(`${url}/bestFilms`)
    const films = await response.json()
    return films
}

export async function getLastMonthFilms() {
    const response = await fetch(`${url}/lastMonthFilms`)
    const films = await response.json()
    return films
}

export async function getUnseenFilms() {
    const response = await fetch(`${url}/unseenFilms`)
    const films = await response.json()
    return films
}

export async function getFilm(id) {
    const response = await fetch(`${url}/unseenFilms/${id}`)
    const film = await response.json()
    return film
}

export async function addFilm(film) {
    const response = await fetch(`${url}/film`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(film),
    })
    const outcome = await response.json()
    return outcome
}

export async function updateFilm(film) {
    const response = await fetch(`${url}/film/${film.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(film),
    })
    const outcome = await response.json()
    return outcome
}

export async function deleteFilm(id) {
    const response = await fetch(`${url}/film/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(film),
    })
    const outcome = await response.json()
    return outcome
}


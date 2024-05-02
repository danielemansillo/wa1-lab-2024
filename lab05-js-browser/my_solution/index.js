'use strict';

class Film {
    constructor(id, title, favourite = false, watchDate, score, user = 1) {
        this.id = id;
        this.title = title;
        this.favourite = favourite;
        this.watchDate = watchDate;
        this.score = score;
        this.user = user;
    }
}

class FilmLibrary {
    constructor(films) {
        this.films = (films == undefined) ? [] : films;
    }

    addNewFilm(film) {
        this.films.push(film)
    }

    sortByDate() {
        const sortedFilms = [...this.films]
        sortedFilms.sort((f1, f2) => {
            if (!f1.watchDate) return 1
            else if (!f2.watchDate) return -1
            else return f1.watchDate - f2.watchDate
        })
        return sortedFilms
    }

    deleteFilm(id) {
        const delIndex = this.films.findIndex(f => f.id === id)
        const removedFilm = this.films[delIndex]
        if (removedFilm) { this.films.splice(delIndex, 1) }
        return removedFilm
    }

    resetWatchedFilms() {
        this.films = this.films.map(f => {
            f.watchDate = null;
            return f;
        })
        return this.films
    }

    getRated() {
        const sortedFilms = this.films.filter(f => f.score);
        sortedFilms.sort((f1, f2) => f2.score - false.score);
        return sortedFilms;
    }
}

const FILM_LIBRARY = new FilmLibrary()

function main() {

    /*
    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2024, Score: 5, User: 1
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2024, Score: 4, User: 1
    Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Score: 0, User: 1
    Id: 4, Title: Matrix, Favorite: false, Watch date: null, Score: 0, User: 1
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2024, Score: 3, User: 1
    */

    FILM_LIBRARY.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2024-03-10"), 5, 1))
    FILM_LIBRARY.addNewFilm(new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4, 1))
    FILM_LIBRARY.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1))
    FILM_LIBRARY.addNewFilm(new Film(4, "Matrix", false, null, 0, 1))
    FILM_LIBRARY.addNewFilm(new Film(5, "Shrek", false, dayjs("2024-04-21"), 3, 1))

    console.log(FILM_LIBRARY.films)
}

main()

function showMovies(table, films) {
    table.textContent = ""
    films.forEach(film => {
        const tr = document.createElement("tr")

        // id
        const th_id = document.createElement("th");
        th_id.scope = "row"
        th_id.innerText = film.id

        // title
        const td_title = document.createElement("td");
        td_title.innerText = film.title

        // is favorite
        const td_favorite = document.createElement("td");
        const td_favorite_div = document.createElement("div")
        td_favorite_div.class = "form-check form-check-inline"
        const td_favorite_div_input = document.createElement("input")
        td_favorite_div_input.type = "checkbox"
        td_favorite_div_input.class = "form-check-input"
        td_favorite_div_input.checked = film.favourite
        td_favorite_div.appendChild(td_favorite_div_input)
        td_favorite.appendChild(td_favorite_div)

        // watch date
        const td_watchDate = document.createElement("td");
        td_watchDate.innerText = film.watchDate && film.watchDate.format("MMMM DD, YYYY")

        // score
        const td_score = document.createElement("td");
        for (let i = 0; i < film.score; i++) {
            const full_star = document.createElement("i");
            full_star.class = "bi bi-star-fill"
            td_score.appendChild(full_star)
        }
        for (let i = film.score; i < 5; i++) {
            const empty_star = document.createElement("i");
            empty_star.class = "bi bi-star"
            td_score.appendChild(empty_star)
        }

        tr.appendChild(th_id)
        tr.appendChild(td_title)
        tr.appendChild(td_favorite)
        tr.appendChild(td_watchDate)
        tr.appendChild(td_score)

        table.appendChild(tr)
    });
}


const tableTitle = document.getElementById("table-title")
const table = document.getElementById("table-body");
const all_tab = document.getElementById("v-pills-all-tab");
const favorite_tab = document.getElementById("v-pills-favorite-tab");
const best_rated_tab = document.getElementById("v-pills-best_rated-tab");
const seen_last_month_tab = document.getElementById("v-pills-seen_last_month-tab");
const unseen_tab = document.getElementById("v-pills-unseen-tab");

document.addEventListener('DOMContentLoaded', event => {
    console.log("Page loaded")
    showMovies(table, FILM_LIBRARY.films)
})

all_tab.addEventListener('click', event => {

    tableTitle.innerText = "All Movies"
    showMovies(table, FILM_LIBRARY.films)
})

favorite_tab.addEventListener('click', event => {
    tableTitle.innerText = "Favorite Movies"
    showMovies(table, FILM_LIBRARY.films.filter(film => film.favourite))
})

best_rated_tab.addEventListener('click', event => {
    tableTitle.innerText = "Best Rated Movies"
    showMovies(table, FILM_LIBRARY.films.filter(film => film.score == 5))
})

seen_last_month_tab.addEventListener('click', event => {
    tableTitle.innerText = "Movies seen last month"
    showMovies(table, FILM_LIBRARY.films.filter(film => {
        const differenceInDays = dayjs().diff(film.watchDate, "day");
        return differenceInDays >= 0 && differenceInDays <= 30;
    }))
})

unseen_tab.addEventListener('click', event => {
    tableTitle.innerText = "Unseen Movies"
    showMovies(table, FILM_LIBRARY.films.filter(film => film.watchDate == null))
})
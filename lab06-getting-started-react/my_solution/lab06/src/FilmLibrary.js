'use strict';

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

export default FilmLibrary
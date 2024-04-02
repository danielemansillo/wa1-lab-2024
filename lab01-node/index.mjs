"use strict";

// Exercise 0
function printFirstLastChars(words, minLen = 2) {
    const getFirstLastChars = (word) => {
        if (word.length < minLen) {
            return "";
        }
        else {
            return word.slice(0, minLen) + word.slice(word.length - minLen);
        }
    }

    words.forEach(word => console.log(getFirstLastChars(word)));
}

const testWords = ["spring", "it", "cat", "b"]
printFirstLastChars(testWords)

import dayjs from 'dayjs';

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

function main() {

    const filmLibrary = new FilmLibrary()

    /*
    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2024, Score: 5, User: 1
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2024, Score: 4, User: 1
    Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Score: 0, User: 1
    Id: 4, Title: Matrix, Favorite: false, Watch date: null, Score: 0, User: 1
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2024, Score: 3, User: 1
    */

    filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2024-03-10"), 5, 1))
    filmLibrary.addNewFilm(new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4, 1))
    filmLibrary.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1))
    filmLibrary.addNewFilm(new Film(4, "Matrix", false, null, 0, 1))
    filmLibrary.addNewFilm(new Film(5, "Shrek", false, dayjs("2024-03-21"), 3, 1))

    console.log(filmLibrary.films)
    console.log(filmLibrary.sortByDate())
    console.log(filmLibrary.deleteFilm(1))
    console.log(filmLibrary.resetWatchedFilms())
    console.log(filmLibrary.getRated())
    console.log(filmLibrary.films)
}

main()
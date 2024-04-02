"use strict";

import dayjs from 'dayjs';
import sqlite from "sqlite3";

const db = new sqlite.Database("films.db", (err) => { if (err) throw err; });

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

    getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films", (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    getFavorites() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE isFavorite = true", (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    getWatchedToday() {
        const today = dayjs().format("YYYY-MM-DD");

        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE watchDate = ?", [today], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    getWatchedBefore(watchDate) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE watchDate < ?", [watchDate], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    getRatingGreaterThan(minRating) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE rating > ?", [minRating], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    getTitleContains(subString) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE title LIKE '%' || ? || '%'", [subString], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows.map((row) => new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId)));
            });
        });
    }

    store(film) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO films(id, title, isFavorite, rating, watchDate, userId)
                    VALUES(?, ?, ?, ?, ?, ?)`, [film.id, film.title, film.favourite, film.score, film.watchDate, film.user],
                function (err, msg) {
                    if (err) console.log("Movie " + film.title + " insertion failed with the following error:\n" + err);
                    else console.log("Movie " + film.title + " inserted with success" + msg)
                });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM films WHERE id = ?", [id],
                function (err) {
                    if (err) console.log("Movie with id " + id + " deletion failed with the following error:\n" + err);
                    else console.log("Movie with id " + id + " deleted with success")
                });
        });
    }

    deleteWatchDate() {
        return new Promise((resolve, reject) => {
            db.run("UPDATE films SET watchDate = null",
                function (err) {
                    if (err) console.log("Watch dates deletion failed with the following error:\n" + err);
                    else console.log("Watch dates of all movies deleted with success")
                });
        });
    }
}

function oldMain() {

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

function main() {

    const filmLibrary = new FilmLibrary()

    // filmLibrary.getAll().then((rows) => { console.log(rows) })
    // filmLibrary.getFavorites().then((rows) => { console.log(rows) })
    // filmLibrary.getWatchedToday().then((rows) => { console.log(rows) })
    // filmLibrary.getWatchedBefore("2024-03-20").then((rows) => { console.log(rows) })
    // filmLibrary.getRatingGreaterThan(4).then((rows) => { console.log(rows) })
    // filmLibrary.getTitleContains("Wars").then((rows) => { console.log(rows) })
    const newFilm = new Film(6, "Killers of the Flower Moon", true, dayjs("2024-03-04"), 5, 3)
    filmLibrary.store(newFilm).then()
    filmLibrary.delete(6).then()
    filmLibrary.deleteWatchDate().then()
    filmLibrary.getAll().then((rows) => { console.log(rows) })
}

main()
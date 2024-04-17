import sqlite from "sqlite3";
import { Film } from "./models.mjs";

// open the database
const db = new sqlite.Database("films.db", (err) => {
    if (err) throw err;
});

export const allFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.rating, f.watchDate, f.userId));
                resolve(answers);
            }
        });
    });
}

export const allFavoriteFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE isFavorite = 1";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((f) => new Film(f.id, f.title, f.isFavourite, f.rating, f.watchDate, f.userId));
                resolve(answers);
            }
        });
    });
}

export const allBestFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE rating = 5";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((f) => new Film(f.id, f.title, f.isFavourite, f.rating, f.watchDate, f.userId));
                resolve(answers);
            }
        });
    });
}

export const allLastMonthFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate >= date('now', '-1 month') AND watchDate < date('now')";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((f) => new Film(f.id, f.title, f.isFavourite, f.rating, f.watchDate, f.userId));
                resolve(answers);
            }
        });
    });
}

export const allUnseenFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate IS NULL";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err)
            else {
                const answers = rows.map((f) => new Film(f.id, f.title, f.isFavourite, f.rating, f.watchDate, f.userId));
                resolve(answers);
            }
        });
    });
}

export const getFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: "Film not available, check the inserted id." });
            else {
                resolve(new Film(row.id, row.title, row.isFavourite, row.rating, row.watchDate, row.userId));
            }
        });
    });
}

export const addFilm = (film) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE id=?";
        db.get(sql, [film.userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: "User not available, check the inserted userId." });
            else {
                sql = "INSERT INTO films(title, isFavorite, rating, watchDate, userId) VALUES(?, ?, ?, DATE(?), ?)";
                db.run(sql, [film.title, film.isFavorite, film.rating, film.watchDate, film.userId], function (err) {
                    if (err)
                        reject(err);
                    else {
                        resolve({ "id": this.lastID, "changes": this.changes });;
                    }
                });
            }
        });
    });
}

export const updateFilm = (id, film) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE id=?";
        db.get(sql, [film.userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: "User not available, check the inserted userId." });
            else {
                sql = "SELECT * FROM films WHERE id=?";
                db.get(sql, [id], (err, row) => {
                    if (err)
                        reject(err);
                    else if (row === undefined)
                        resolve({ error: "Film not available, check the inserted id." });
                    else {
                        sql = "UPDATE films SET title = ?, isFavorite = ?, rating = ?, watchDate = ?, userId = ? WHERE id=?";
                        db.run(sql, [film.title, film.isFavorite, film.rating, film.watchDate, film.userId, id], function (err) {
                            if (err)
                                reject(err);
                            else {
                                resolve({ "id": id, "changes": this.changes });
                            }
                        });
                    }
                });
            }
        });
    });
}

export const updateFilmRating = (id, rating) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET rating = ? WHERE id=?";
        db.run(sql, [rating, id], function (err) {
            if (err)
                reject(err);
            else {
                resolve({ "id": id, "changes": this.changes });
            }
        });
    });
}

// TODO Check if they wanted just a switch or a set like this
export const updateFilmIsFavorite = (id, isFavorite) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET isFavorite = ? WHERE id=?";
        db.run(sql, [isFavorite, id], function (err) {
            if (err)
                reject(err);
            else {
                resolve({ "id": id, "changes": this.changes });
            }
        });
    });
}

export const deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM films WHERE id=?";
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: "Film not available, check the inserted id." });
            else {
                sql = "DELETE FROM films WHERE id=?";
                db.run(sql, [id], function (err) {
                    if (err)
                        reject(err);
                    else {
                        resolve({ "id": id, "changes": this.changes });
                    }
                });
            }
        });
    });
}

import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import dayjs from 'dayjs';
import *  as dao from './dao.mjs'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))

const checkId = (req, res, next) => {
    const id = req.params.id;

    // Check if id is an integer
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ error: "Invalid id. It must be an integer." });
    }

    next();
};

const checkRating = (req, res, next) => {
    const rating = req.params.rating;

    // Check if id is an integer
    if (!Number.isInteger(parseInt(rating)) || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Invalid rating. It must be an integer between 0 and 5." });
    }

    next();
};

const checkisFavorite = (req, res, next) => {
    const isFavorite = req.params.isFavorite;

    // Check if id is an integer
    if (isFavorite !== 'true' && isFavorite !== 'false') {
        return res.status(400).json({ error: "Invalid isFavorite. It must be a boolean." });
    }

    next();
};

const checkFilm = (req, res, next) => {
    const film = req.body;

    let error = { errors: [] }
    if (typeof film.title !== 'string') {
        error["errors"].push("Invalid title. It must be a string.");
    }
    if (typeof film.isFavorite !== 'boolean') {
        error["errors"].push("Invalid isFavorite. It must be a boolean.");
    }
    if (!Number.isInteger(film.rating) || film.rating < 0 || film.rating > 5) {
        error["errors"].push("Invalid rating. It must be an integer between 0 and 5.");
    }
    if (("watchDate" in film) && film.watchDate != null && film.watchDate != "" && !dayjs(film.watchDate, 'YYYY-MM-DD', true).isValid()) {
        error["errors"].push("Invalid watchDate. It must be an date in format 'YYYY-mm-dd'.");
    }
    if (!Number.isInteger(film.userId)) {
        error["errors"].push("Invalid userId. It must be an integer.");
    }

    // Check if there are no extra fields in the request body
    const allowedFields = ['id', 'title', 'isFavorite', 'rating', 'watchDate', 'userId'];
    const extraFields = Object.keys(film).filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        error["errors"].push(`Unexpected fields: ${extraFields.join(', ')}.`);
    }

    if (error["errors"].length > 0)
        return res.status(400).json(error);

    next();
};

app.get('/films', (req, res) => {
    dao.allFilms().then((films) => {
        res.json(films)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.get('/favoriteFilms', (req, res) => {
    dao.allFavoriteFilms().then((films) => {
        res.json(films)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.get('/bestFilms', (req, res) => {
    dao.allBestFilms().then((films) => {
        res.json(films)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.get('/lastMonthFilms', (req, res) => {
    dao.allLastMonthFilms().then((films) => {
        res.json(films)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.get('/unseenFilms', (req, res) => {
    dao.allUnseenFilms().then((films) => {
        res.json(films)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.get('/film/:id', checkId, (req, res) => {
    dao.getFilm(req.params.id).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.post('/film', checkFilm, (req, res) => {
    dao.addFilm(req.body).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.put('/film/:id', checkId, checkFilm, (req, res) => {
    dao.updateFilm(req.params.id, req.body).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.put('/film/:id/rating/:rating', checkId, checkRating, (req, res) => {
    dao.updateFilmRating(req.params.id, req.params.rating).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.put('/film/:id/isFavorite/:isFavorite', checkId, checkisFavorite, (req, res) => {
    let isFavorite;
    if (req.params.isFavorite === "true")
        isFavorite = true
    else if (req.params.isFavorite === "false")
        isFavorite = false

    dao.updateFilmisFavorite(req.params.id, isFavorite).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.delete('/film/:id', checkId, (req, res) => {
    dao.deleteFilm(req.params.id).then((answer) => {
        if (answer.hasOwnProperty("error"))
            res.status(404).json(answer)
        else
            res.json(answer)
    }).catch((err) => {
        res.status(500).send("Database error: " + err)
    })
})

app.listen(3000, [morgan('tiny')], () => { console.log('Application listening on port 3000') })
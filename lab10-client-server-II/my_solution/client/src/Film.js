'use strict';

class Film {
    constructor(id, title, isFavorite = false, watchDate, rating, userId = 1) {
        this.id = id;
        this.title = title;
        this.isFavorite = isFavorite;
        this.watchDate = watchDate;
        this.rating = rating;
        this.userId = userId;
    }
}

export default Film
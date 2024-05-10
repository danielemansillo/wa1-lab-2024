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

export default Film
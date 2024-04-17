import dayjs from "dayjs";

export class Film {
    constructor(id, title, isFavorite = false, rating, watchDate, userId = 1) {
        this.id = id;
        this.title = title;
        this.isFavourite = isFavorite;
        this.rating = rating;
        this.watchDate = dayjs(watchDate);
        this.userId = userId;
    }
}

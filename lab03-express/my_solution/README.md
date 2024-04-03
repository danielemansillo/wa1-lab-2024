# Documentation

## GET /films

```http
GET http://localhost:3000/films
```

Retrieve the list of all the available films.

### Sample request

```http
GET http://localhost:3000/films
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 935
ETag: W/"3a7-M2bZVhvugIPk66qq6C1GjyNA2iQ"
Date: Wed, 03 Apr 2024 18:22:24 GMT
Connection: close

[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavourite": 1,
    "rating": 5,
    "watchDate": "2024-03-09T23:00:00.000Z",
    "userId": 1
  },
  {
    "id": 2,
    "title": "21 Grams",
    "isFavourite": 1,
    "rating": 4,
    "watchDate": "2024-03-16T23:00:00.000Z",
    "userId": 1
  },
  {
    "id": 3,
    "title": "Star Wars",
    "isFavourite": 0,
    "rating": null,
    "watchDate": null,
    "userId": 1
  },
  {
    "id": 4,
    "title": "Matrix",
    "isFavourite": 0,
    "rating": null,
    "watchDate": null,
    "userId": 2
  },
  {
    "id": 5,
    "title": "Shrek",
    "isFavourite": 0,
    "rating": 3,
    "watchDate": "2024-03-20T23:00:00.000Z",
    "userId": 2
  }
]
```

### Error response

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## GET /favoriteFilms

```http
GET http://localhost:3000/favoriteFilms
```

Retrieve a list of all the favorite films

### Sample request

```http
GET http://localhost:3000/favoriteFilms
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 686
ETag: W/"2ae-JUKrsUd0fqX8dsdt/rInGwNmk8w"
Date: Wed, 03 Apr 2024 18:26:25 GMT
Connection: close

[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavourite": false,
    "rating": 5,
    "watchDate": "2024-03-09T23:00:00.000Z",
    "userId": 1
  },
  {
    "id": 2,
    "title": "21 Grams",
    "isFavourite": false,
    "rating": 4,
    "watchDate": "2024-03-16T23:00:00.000Z",
    "userId": 1
  }
]

```

### Error response

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## GET /bestFilms

```http
GET http://localhost:3000/bestFilms
```

Retrieve a list of all the best films (i.e., those rated 5 out of 5).

### Sample request

```http
GET http://localhost:3000/bestFilms
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 686
ETag: W/"2ae-JUKrsUd0fqX8dsdt/rInGwNmk8w"
Date: Wed, 03 Apr 2024 18:26:25 GMT
Connection: close

[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavourite": false,
    "rating": 5,
    "watchDate": "2024-03-09T23:00:00.000Z",
    "userId": 1
  }
]

```

### Error response

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## GET /lastMonthFilms

```http
GET http://localhost:3000/lastMonthFilms
```

Retrieve a list of all the films seen in the last month.

### Sample request

```http
GET http://localhost:3000/lastMonthFilms
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 686
ETag: W/"2ae-JUKrsUd0fqX8dsdt/rInGwNmk8w"
Date: Wed, 03 Apr 2024 18:26:25 GMT
Connection: close

[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavourite": false,
    "rating": 5,
    "watchDate": "2024-03-09T23:00:00.000Z",
    "userId": 1
  }
]

```

### Error response

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## GET /unseenFilms

```http
GET http://localhost:3000/unseenFilms
```

Retrieve a list of all the unseen films (i.e., the films without a specified “watchDate”).

### Sample request

```http
GET http://localhost:3000/unseenFilms
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 180
ETag: W/"b4-yRyJy3Sh8tWGd+tiJ0sb1AKBR6c"
Date: Wed, 03 Apr 2024 18:32:45 GMT
Connection: close

[
  {
    "id": 3,
    "title": "Star Wars",
    "isFavourite": false,
    "rating": null,
    "watchDate": null,
    "userId": 1
  },
  {
    "id": 4,
    "title": "Matrix",
    "isFavourite": false,
    "rating": null,
    "watchDate": null,
    "userId": 2
  }
]
```

### Error response

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## GET /film/:id

```http
GET http://localhost:3000/film/:id
```

Retrieve a specific film given its “id”.

### Sample request

```http
GET http://localhost:3000/film/1
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 112
ETag: W/"70-7JWXjVm/3n705Uodsz3qAFvPUS0"
Date: Wed, 03 Apr 2024 18:33:54 GMT
Connection: close

{
  "id": 1,
  "title": "Pulp Fiction",
  "isFavourite": false,
  "rating": 5,
  "watchDate": "2024-03-09T23:00:00.000Z",
  "userId": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid id. It must be an integer."
}
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-wK6iIXhxCPtA48G3Qcv7M4uRlz4"
Date: Wed, 03 Apr 2024 18:34:17 GMT
Connection: close

{
  "error": "Film not available, check the inserted id."
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## POST /film

```http
POST http://localhost:3000/film
content-type: application/json

{
    "title": <string>,
    "isFavorite": <boolean>,
    "rating": <integer>,
    "watchDate": <date>,
    "userId": <integer>
}
```

Create a new film, by providing all its information except the “id” that will be automatically assigned by the back-end.

### Sample request

```http
POST http://localhost:3000/film
content-type: application/json

{
    "title": "Pierrot le fou",
    "isFavorite": true,
    "rating": 4,
    "watchDate": "2024-04-01",
    "userId": 3
}
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-mZRtlCLtVh/8wv9XwU9K3/vdSOE"
Date: Wed, 03 Apr 2024 18:36:41 GMT
Connection: close

{
  "id": 10,
  "changes": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "errors": [
    "Invalid title. It must be a string.",
    "Invalid isFavorite. It must be a boolean.",
    "Invalid rating. It must be an integer between 1 and 5.",
    "Invalid watchDate. It must be an date in format 'YYYY-mm-dd'.",
    "Invalid userId. It must be an integer.",
    "Unexpected fields: extraField."
  ]
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## PUT /film/:id

```http
PUT http://localhost:3000/film/:id
content-type: application/json

{
    "title": <string>,
    "isFavorite": <boolean>,
    "rating": <integer>,
    "watchDate": <date>,
    "userId": <integer>
}
```

Update an existing film, by providing its information.

### Sample request

```http
PUT http://localhost:3000/film/10
content-type: application/json

{
    "title": "Pierrot le fou",
    "isFavorite": true,
    "rating": 4,
    "watchDate": "2024-04-01",
    "userId": 3
}
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-mZRtlCLtVh/8wv9XwU9K3/vdSOE"
Date: Wed, 03 Apr 2024 18:36:41 GMT
Connection: close

{
  "id": 10,
  "changes": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid id. It must be an integer."
}
```

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "errors": [
    "Invalid title. It must be a string.",
    "Invalid isFavorite. It must be a boolean.",
    "Invalid rating. It must be an integer between 1 and 5.",
    "Invalid watchDate. It must be an date in format 'YYYY-mm-dd'.",
    "Invalid userId. It must be an integer.",
    "Unexpected fields: extraField."
  ]
}
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-wK6iIXhxCPtA48G3Qcv7M4uRlz4"
Date: Wed, 03 Apr 2024 18:42:09 GMT
Connection: close

{
  "error": "Film not available, check the inserted id."
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## PUT /film/:id/rating/:rating

```http
PUT http://localhost:3000/film/:id/rating/:rating
```

Update the rating of a specific film.

### Sample request

```http
PUT http://localhost:3000/film/6/rating/3
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-mZRtlCLtVh/8wv9XwU9K3/vdSOE"
Date: Wed, 03 Apr 2024 18:36:41 GMT
Connection: close

{
  "id": 10,
  "changes": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid id. It must be an integer.",
}
```

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid rating. It must be an integer between 1 and 5.",
}
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-wK6iIXhxCPtA48G3Qcv7M4uRlz4"
Date: Wed, 03 Apr 2024 18:42:09 GMT
Connection: close

{
  "error": "Film not available, check the inserted id."
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## PUT /film/:id/isFavorite/:isFavorite

```http
PUT http://localhost:3000/film/:id/isFavorite/:isFavorite
```

Mark an existing film as favorite/unfavorite.

### Sample request

```http
PUT http://localhost:3000/film/10/isFavorite/true
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-mZRtlCLtVh/8wv9XwU9K3/vdSOE"
Date: Wed, 03 Apr 2024 18:36:41 GMT
Connection: close

{
  "id": 10,
  "changes": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid id. It must be an integer.",
}
```

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid isFavorite. It must be a boolean.",
}
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-wK6iIXhxCPtA48G3Qcv7M4uRlz4"
Date: Wed, 03 Apr 2024 18:42:09 GMT
Connection: close

{
  "error": "Film not available, check the inserted id."
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

## DELETE /film/:id

```http
DELETE http://localhost:3000/film/:id
```

Mark an existing film as favorite/unfavorite.

### Sample request

```http
DELETE http://localhost:3000/film/10
```

### Sample response

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-mZRtlCLtVh/8wv9XwU9K3/vdSOE"
Date: Wed, 03 Apr 2024 18:36:41 GMT
Connection: close

{
  "id": 10,
  "changes": 1
}
```

### Error responses

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 289
ETag: W/"121-tpwzc4/1wbMJO2xF8CkBSx+rmTo"
Date: Wed, 03 Apr 2024 18:37:38 GMT
Connection: close

{
  "error": "Invalid id. It must be an integer.",
}
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-wK6iIXhxCPtA48G3Qcv7M4uRlz4"
Date: Wed, 03 Apr 2024 18:42:09 GMT
Connection: close

{
  "error": "Film not available, check the inserted id."
}
```

```http
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 56
ETag: W/"38-7/fPZhDVpvDxJwjeaBtDHyLLW3w"
Date: Wed, 03 Apr 2024 18:19:09 GMT
Connection: close

Database error: ...
```

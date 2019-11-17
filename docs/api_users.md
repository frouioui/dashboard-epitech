# **User API**

## **Version**

v1.0.0

## **Author**

- florent.poinsard@epitech.eu

## **Tech choice**

This API is a NodeJS based application.

Why NodeJS? For this API we used a library that partially wraps GitHub API, this library is in Node JS, so here is why we used node js.

As this API does a lot of database query (I/O) we needed somthing asynchronous and fast, so we used Node JS.

Node JS allows us to use thread and async opération very easily.

## **Description**

The user API enable developer to interact with the users of Pedafy.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get all users | `GET` | `/v1/users` |
| Login user | `POST` | `/v1/users/login` |
| Add a new user | `POST` | `/v1/users/new` |

### ***Production URL***

- https://api.pedafy.com/v1/users ...

### ***Development URL***

- http://localhost:9000/v1/users ...

## **Routes description**

### **Get all users**

Request type: `GET`.

URL: `/v1/users`.

Empty `GET` request. Returns an array of users.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "email": "florent.poinsard@toto.com",
            "password": "$2b$10$XvRrJh/",
            "added_at": "2019-10-28T23:50:25.000Z"
        }
    ]
}
```
____
### **Add a new user**

Request type: `POST`.

URL: `/v1/users/new`.

Create a new user in the database. Your body must contain the new user's information. The server return the new user's ID.

Here is an example of the **request** JSON body:

```json
{
    "email": "florent.poinsard@toto.com",
    "password": "my_password",
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "id": 1,
    }
}
```

____
### **Login user**

Request type: `POST`.

URL: `/v1/users/login`.

Login an existing user. You request's body must contain the user's credentials (email and password). The server return wether or not the user is given access to the website or not.

Here is an example of the **request** JSON body:

```json
{
    "email": "florent.poinsard@toto.com",
    "password": "my_password",
}
```

Here is an example of a **response** when the user is successfuly authenticated:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "message": "Authenticated",
    }
}
```

Here is an example of a **response** when the user gave a wrong password:
```json
{
    "status": "failure",
    "code": 401,
    "data": {
        "message": "Wrong password",
    }
}
```

Here is an example of a **response** when the user gave a wrong email:
```json
{
    "status": "failure",
    "code": 401,
    "data": {
        "message": "No email found",
    }
}
```
____

## **Database**

We uses a MySQL database for this API.

### **The scheme**

There is only one table in the `api_users` database.

The table **users**:

| id | email | password | added_at |
| ---- | ---- | ---- | ---- |
| 1 | florent.poinsard@toto.com | UZBYFF | 2019-10-28T23:56:29.000Z |
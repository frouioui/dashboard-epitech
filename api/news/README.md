# **News API**

## **Version**

v1.0.0

## **Author**

- florent.poinsard@epitech.eu

## **Description**

The News API enable developers to uses the services we provide on pedafy.com. Here is the link to the used external service : https://newsapi.org.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get news from a keyword | `GET` | `/v1/news/search` |
| Get headlines | `GET` | `/v1/news/headlines` |
| Get headlines from a country | `GET` | `/v1/news/headlines/country` |

### ***Production URL***

- https://api.pedafy.com/v1/news ...

### ***Development URL***

- http://localhost:9000/v1/news ...

## **Routes description**

### **Get news from a keyword**

Request type: `GET`.

URL: `/v1/news/search?q={{query}}&lang={{lang}}`.

Params:
- q = The keyword we are looking for
- lang = The language ('fr', 'cn', 'en', 'jp')

Empty `GET` request. Returns an array of news.

Here is an example of a **response**:
```json
{
    "code": 200,
    "data": {
        "author": "Romain Dillet",
        "title": "A bike lover’s take on the Cowboy e-bike",
        "url": "http://techcrunch.com/2019/10/23/a-bike-lovers-take-on-the-cowboy-e-bike/"
    },
    "satus": "success"
}
```

If no news were found :
```json
{
    "code": 200,
    "message": "no news at the moment",
    "status": "success"
}
```
____
### **Get headlines**

Request type: `GET`.

URL: `/v1/news/headlines?q={{query}}&lang={{lang}}`.

Params:
- q = The keyword we are looking for
- lang = The language ('fr', 'cn', 'en', 'jp')

Get the headlines corresponding to a keyword.

Here is an example of a **response**:
```json
{
    "code": 200,
    "data": {
        "author": "Mallory Mower",
        "title": "35 Products That Are Kinda Crude, Dude",
        "url": "https://www.buzzfeed.com/malloryannp/products-that-are-kinda-crude-dude-2019"
    },
    "satus": "success"
}
```

If no headlines were found :
```json
{
    "code": 200,
    "message": "no headlines at the moment",
    "status": "success"
}
```

____
### **Get headlines for a country**

Request type: `GET`.

URL: `/v1/news/headlines/country?country={{country}}&lang={{lang}}`.

Params:
- country = The country we are looking for
- lang = The language ('fr', 'cn', 'en', 'jp')

Get the headlines corresponding to a country.

Here is an example of a **response**:
```json
{
    "code": 200,
    "data": {
        "author": "Mallory Mower",
        "title": "35 Products That Are Kinda Crude, Dude",
        "url": "https://www.buzzfeed.com/malloryannp/products-that-are-kinda-crude-dude-2019"
    },
    "satus": "success"
}
```

If no headlines were found :
```json
{
    "code": 200,
    "message": "no headlines at the moment",
    "status": "success"
}
```

# **Epitech Currency API**

## **Version**

v1.0.0

## **Author**

- florent.poinsard@epitech.eu

## **Tech choice**

This API is a Golang (v1.12) based application.

Why Golang? Golang is a fast and realiable language allowing us to deliver a fast and safe API.

Goland is a programming language used more and more by companies, its reliability and speed makes him a great language.

No frameworks were used.

## **Description**

The Currency API enable developers to uses the wrapper of the [currency API](https://exchangeratesapi.io) we provide on pedafy.com.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get rate for one currency | `GET` | `/v1/currenct/convert?from={currency}&to={currency}` |
| Get the currency translation | `GET` | `/v1/intra/calcul?from={currency}&to={currency}&amount={int}` |

### ***Production URL***

- https://api.pedafy.com/v1/currency ...

### ***Development URL***

- http://localhost:9005/v1/currency ...

## **Routes description**

### **Get rate for one currency**

Request type: `GET`.

URL: `/v1/currency/convert?from={currency}&to={currency}`.

`from` and `to` are the currency code (for example: `EUR`, `USD`, ...)

`from` is the source currency we want to tanslate into `to`'s currency.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "base": "EUR",
        "date": "2019-11-15",
        "rates": {
            "CNY": 7.7343
        }
    }
}
```

____
### **Get the currency translation**

Request type: `GET`.

URL: `/v1/intra/calcul?from={currency}&to={currency}&amount={int}`.

`from` and `to` are the currency code (for example: `EUR`, `USD`, ...)

`from` is the source currency we want to tanslate into `to`'s currency.

`amount` is the amount of money we want to calculate for example `2`.

Here is a request example:

- /v1/intra/calcul?from=EUR&to=CNY&amount=2

In this request we want to translate 2 EUR in CNY.

And here is the **response** related to our previous request:
```json
{
    "status": "success",
    "code": 200,
    "data": 15.47
}
```
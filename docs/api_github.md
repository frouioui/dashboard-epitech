# **Epitech Currency API**

## **Version**

v1.0.0

## **Author**

- florent.poinsard@epitech.eu

## **Description**

The Currency API enable developers to uses the wrapper of the [currency API](https://exchangeratesapi.io) we provide on pedafy.com.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get the last issues of a repo | `GET` | `/v1/github/:owner/:repo/last/issue` |
| Get the last pulls of a repo | `GET` | `/v1/github/:owner/:repo/last/pull` |

### ***Production URL***

- https://api.pedafy.com/v1/github ...

### ***Development URL***

- http://localhost:9004/v1/github ...

## **Routes description**

### **Get the last issues of a repo**

Request type: `GET`.

URL: `/v1/github/:owner/:repo/last/issue`.

`repo` is the name of the repository.

`owner` is the github user who's owner of the `repo`.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "name": "Call to currency API in currency service",
        "url": "https://github.com/frouioui/dashboard-epitech/issues/115",
        "number": 115
    }
}
```

____
### **Get the last pulls of a repo**

Request type: `GET`.

URL: `/v1/github/:owner/:repo/last/issue`.

`repo` is the name of the repository.

`owner` is the github user who's owner of the `repo`.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "name": "Bump lodash.template from 4.4.0 to 4.5.0 in /app",
        "url": "https://api.github.com/repos/frouioui/dashboard-epitech/pulls/65",
        "number": 65
    }
}
```
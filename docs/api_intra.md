# **Epitech Intranet API**

## **Version**

v1.0.0

## **Author**

- florent.poinsard@epitech.eu

## **Description**

The Intranet API enable developers to uses the Epitech Intranet Service we provide on pedafy.com.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get the user's logtime | `GET` | `/v1/intra/netsoul` |
| Get the user's last gares | `GET` | `/v1/intra/marks` |
| Get the user's GPA and credits | `GET` | `/v1/intra/grade/:cycle` |

### ***Production URL***

- https://api.pedafy.com/v1/intra ...

### ***Development URL***

- http://localhost:9003/v1/intra ...

## **Madatory for each request**

Each request must be filled with an `Authorization` header.

You need to put the user's intranet token in the authorization header.

Example:

- key = `Authorization`
- value = `auth-14zufheriufen70473434bjnbiubfa197764516`

## **Routes description**

### **Get the user's logtime**

Request type: `GET`.

URL: `/v1/intra/netsoul`.

Empty `GET` request.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": "99"
}
```

____
### **Get last marks**

Request type: `GET`.

URL: `/v1/intra/marks`.

Get the last marks of an user.

Here is an example of a **response**:
```json
    "status": "success",
    "code": 200,
    "data": [
        {
            "title": "Epicture",
            "note": "10",
            "noteur": "benjamin.roux@epitech.eu",
            "title_link": "https://intra.epitech.eu/module/2019/B-DEV-501/TLS-5-1/acti-355956/"
        },
        {
            "title": "TEPitech",
            "note": "910",
            "noteur": "jeremy1.harrault@epitech.eu",
            "title_link": "https://intra.epitech.eu/module/2019/B-ANG-058/TLS-0-1/acti-346608/"
        }
    ]
}
```

The `noteur` field corresponds to the teacher who gave the mark.

____
### **Get GPA and credits**

Request type: `GET`.

URL: `/v1/intra/grade/{{cycle}}`.

Params:
- cycle = Can either be `bachelor` or `master`

Get the GPA and the amount of credits of an user.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "gpa": 3.76,
        "credits": 123
    }
}
```

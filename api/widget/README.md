# **Widget API**

## **Version**

v1.1.0

## **Author**

- florent.poinsard@epitech.eu

## **Description**

The widget API enable developer to interact with the widgets and services of Pedafy. They can retreive all the user's widgets, pedafy's services and available widets including their parameters. Users can also get their widgets' parameters.

This API uses the Richardson Maturity Model, more info [here](https://martinfowler.com/articles/richardsonMaturityModel.html).

## **Before you dive in**

Here is how works our widgets system.

The widget system relies on *services*, those services are public APIs like (weather API, Nasa API, YouTube API, ...). Those services can be managed thru our dedicated services route.

Each services have one or more available widgets. Those widgets can be used by users.

Each widgets have one or more parameters. For example: the name of the city if we have a temperature widget.

Each user can have one or more widgets. You can manage them thru the `*/widgets/user/*` routes.

As we said ... each widgets have parameters. Users can add parameters for their added widgets. They are called ***user widget param***.

## **Routes**

### **Special routes**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all information widgets user | `GET` | `/v1/widgets/user/:id/all/widgets` |


### **Services**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all services | `GET` | `/v1/widgets/services` |
| Get service by ID | `GET` | `/v1/widgets/service/:id` |
| Add a new service | `POST` | `/v1/widgets/service` |

### **Widgets**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all the available widgets | `GET`| `/v1/widgets` |
| Add a new widget | `POST` | `/v1/widgets`|
| Search a widget | `GET`| `/v1/widgets/search` |

### **Widget params**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all the widgets params | `GET` | `/v1/widgets/params` |
| Search widgets params | `GET` | `/v1/widgets/params/search` |
| Add a new widget param | `POST` | `/v1/widgets/param` |

### **User widgets**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all the user widgets | `GET` | `/v1/widgets/user`|
| Add a user widget | `POST` | `/v1/widgets/user` |
| Change the position of a user widget | `PUT` | `/v1/widgets/user/position/:id`|
| Delete a user widget | `DELETE` | `/v1/widgets/user/delete/:id` |
| Search a user widget | `GET` | `/v1/widgets/user/search` |

### **User widget params**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get all user widgets params | `GET`| `/v1/widgets/params` |
| Add a user widget param | `POST`| `/v1/widgets/user/params` |
| Delete a user widget param | `DELETE` | `/v1/widgets/user/params/delete/:id` |
| Search a user widget param | `GET` | `/v1/widgets/user/params/search`|
| Modify value of a param | `PUT` | `/v1/widgets/users/param/:id` |

## **Routes description - Special routes**

### **Get all information widgets user**

Request type: `GET`.

URL: `/v1/widgets/user/{{id}}/all/widgets`.

Empty `GET` request. Returns an array containing all the information for the user's widgets and its parameters.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 6,
            "position": 1,
            "user_id": 1,
            "widget_id": 1,
            "name": "Temperature",
            "service_id": 1,
            "description": "Display the city's temperature",
            "params": [
                {
                    "id": 5,
                    "value": "Toulouse",
                    "user_widget_id": 6,
                    "widget_param_id": 1,
                    "user_id": 1,
                    "name": "city",
                    "type": "string"
                }
            ]
        }
    ]
}
```
____

## **Routes description - Services**

### **Get all services**

Request type: `GET`.

URL: `/v1/widgets/services`.

Empty `GET` request. Returns an array of service.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "name": "weather"
        }
    ]
}
```
____
### **Add a new service**

Request type: `POST`.

URL: `/v1/widgets/service`.

Create a new service. Your body must contain the name of the service. The server return the new service's ID.

Here is an example of the **request** JSON body:

```json
{
    "name": "weather"
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": 2
}
```

____
### **Get one service**

Request type: `GET`.

URL: `/v1/widgets/service/{{id}}`.

Get the information about one service.

Here is an example of a **response** 
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "name": "weather"
        }
    ]
}
```
____

## **Routes description - Widgets**

### **Get all widgets**

Request type: `GET`.

URL: `/v1/widgets`.

Empty `GET` request. Returns an array of widgets.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "service_id": 1,
            "name": "Temperature",
            "description": "Display the city's temperature"
        },
        {
            "id": 2,
            "service_id": 1,
            "name": "Wind speed",
            "description": "Display the city's wind speed"
        }
    ]
}
```
____
### **Search widgets**

Request type: `GET`.

URL: `/v1/widgets/search?key={{key}}&value={{value}}`.

Empty `GET` request. Returns an array of widgets.

You must put variable in your query. The **key** and **value**.

- search by ID the **key** param = "id"
- search by name the **key** param = "name"
- search by service's id the **key** param = "service_id

For instance :

- https://api.pedafy.com/v1/widgets/search?key=id&value=1
- https://api.pedafy.com/v1/widgets/search?key=name&value=temperature

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "service_id": 1,
            "name": "Temperature",
            "description": "Display the city's temperature"
        },
        {
            "id": 2,
            "service_id": 1,
            "name": "Wind speed",
            "description": "Display the city's wind speed"
        }
    ]
}
```
____
### **Add a widget**

Request type: `POST`.

URL: `/v1/widgets`.

Create a new widget. Your body must contain the name of the widget, the ID of the service and a description of the widget. The server return the new widget's ID.

Here is an example of the **request** JSON body:

```json
{
	"name": "Wind speed",
	"description": "Display the city's wind speed",
	"service_id": 1
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": 2
}
```
____

## **Routes description - Widget params**

### **Get all widget params**

Request type: `GET`.

URL: `/v1/widgets/params`.

Empty `GET` request. Returns an array of widget params.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "name": "city",
            "type": "string",
            "widget_id": 1
        },
        {
            "id": 2,
            "name": "city",
            "type": "string",
            "widget_id": 2
        }
    ]
}
```
____

### **Search widget params**

Request type: `GET`.

URL: `/v1/widgets/params/search?key={{key}}&value={{value}}`.

Empty `GET` request. Returns an array of widget params.

You must put variable in your query. The **key** and **value**.

- search by ID the **key** param = "id"
- search by widget's ID the **key** param = "widget_id"

For instance :

- https://api.pedafy.com/v1/widgets/params/search?key=id&value=1
- https://api.pedafy.com/v1/widgets/params/search?key=widget_id&value=34

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 1,
            "name": "city",
            "type": "string",
            "widget_id": 1
        }
    ]
}
```
____

### **Add a widget param**

Request type: `POST`.

URL: `/v1/widgets/param`.

Create a new widget param. Your body must contain the id of the widget it is linked to, the name and a type of the widget. The server return the new widget param's ID.

Here is an example of the **request** JSON body:

```json
{
	"name": "city",
	"widget_id": 2,
	"type": "string"
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": 2
}
```
____

## **Routes description - User's widget **

### **Get all user's widget**

Request type: `GET`.

URL: `/v1/widgets/user`.

Empty `GET` request. Returns an array of user's widget.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 2,
            "position": 1,
            "user_id": 1,
            "widget_id": 2
        }
    ]
}
```
____

### **Delete a user's widget**

Request type: `DELETE`.

URL: `/v1/widgets/user/delete/{{id}}`.

Delete a user's widget.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "message": "Deleted"
    }
}
```
____

### **Add a user's widget**

Request type: `POST`.

URL: `/v1/widgets/user`.

Create a new user widget. Your body must contain the id of the widget it is linked to, the user id and also the position the widget is in. The server return the new user widget's ID.

Here is an example of the **request** JSON body:

```json
{
	"user_id": 1,
	"position": 2,
	"widget_id": 2
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": 3
}
```
____

### **Modify a user widget's position**

Request type: `PUT`.

URL: `/v1/widgets/user/position/{{user_widget_id}}`.

Modify the position of a user widget. The body of the request must contain the new position.

Here is an example of the **request** JSON body:

```json
{
	"position": 2
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200
}
```
____

### **Search a user's widget**

Request type: `GET`.

URL: `localhost:9001/v1/widgets/user/search?key={{key}}&value={{value}} [ &order=position ]`.

Empty `GET` request. Returns an array of widget params.

You must put variable in your query. The **key** and **value**.

- search by ID the **key** param = "id"
- search by name the **key** param = "name"
- search by user ID the **key** param = "user_id"

You can also add the variable `order=position` in your query, it will order the results from the 1st position to the last position.

For instance :

- https://api.pedafy.com/v1/widgets/user/search?key=id&value=1
- https://api.pedafy.com/v1/widgets/user/search?key=name&value=temperature
- https://api.pedafy.com/v1/widgets/user/search?key=user_id&value=4349&order=position

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 2,
            "position": 1,
            "user_id": 1,
            "widget_id": 2
        }
    ]
}
```
____

## **Routes description - User widgets' params **

### **Get all user widgets' params**

Request type: `GET`.

URL: `/v1/widgets/user/params`.

Empty `GET` request. Returns an array of user widgets' params.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 3,
            "value": "Toulouse",
            "user_widget_id": 4,
            "widget_param_id": 1,
            "user_id": 1
        }
    ]
}
```
____

### **Search a user widgets' params**

Request type: `GET`.

URL: `localhost:9001/v1/widgets/user/params/search?key=widget_user_id&value={{value}}`.

Empty `GET` request. Returns an array of user widgets' params.

You must put variable in your query. The **key** and **value**.

- search by ID the **key** param = "id"
- search by widget user ID the **key** param = "widget_user_id"
- search by user ID the **key** param = "user_id"

For instance :

- https://api.pedafy.com/v1/widgets/user/search?key=id&value=1
- https://api.pedafy.com/v1/widgets/user/search?key=widget_user_id&value=1

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": 3,
            "value": "Toulouse",
            "user_widget_id": 4,
            "widget_param_id": 1,
            "user_id": 1
        }
    ]
}
```
____


### **Add a user widget's param**

Request type: `POST`.

URL: `/v1/widgets/user/param`.

Create a new user widget's param.

Your body must contain:

- the value of the param
- the user id
- the user's widget id
- the widget's param id it is linked to

Here is an example of the **request** JSON body:

```json
{
	"value": "Toulouse",
	"user_id": 1,
	"widget_user_id": 4,
	"widget_param_id": 1
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": 3
}
```
____

### **Delete a user's widget param**

Request type: `DELETE`.

URL: `/v1/widgets/user/params/delete/{{id}}`.

Delete a user's widget.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": {
        "message": "Deleted"
    }
}
```
____

### **Modify a user widget's param value**

Request type: `PUT`.

URL: `/v1/widgets/user/param/{{id}}`.

Modify the value of a user widget param. The body of the request must contain the new value.

Here is an example of the **request** JSON body:

```json
{
	"value": "Paris"
}
```

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200
}
```

## **Database**

We uses a MySQL database for this API.

### **The scheme**

The whole scheme is available [here](../../server/database/api_widget.sql).

The table **services**:

| id | name |
| ---- | ---- |
| 1 | weather |

The table **widgets**:

| id | service_id | name | description |
| ---- | ---- | ---- | ---- |
| 1 | 3 | Temperature | Display the temperature of a city |

The table **widget_params**:

| id | name | type | widget_id |
| ---- | ---- | ---- | ---- |
| 1 | city | string | 1 |


The table **widgets_user**:

| id | position | user_id | widget_id |
| ---- | ---- | ---- | ---- |
| 1 | 4 | 48790 | 1 |

The table **widget_user_params**:

| id | value | user_widget_id | widget_param_id | user_id |
| ---- | ---- | ---- | ---- | ---- |
| 1 | Toulouse | 1 | 1 | 48201 |
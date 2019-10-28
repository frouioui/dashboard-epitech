# **Dashboard Epitech**

## **Authors**

- florent.poinsard@epitech.eu
- julien.ferrier@epitech.eu

## **Production deployement**

Our project uses `docker-compose` and `google cloud platform`.

### **Docker compose**

Docker compose is used for **local environment only**.

To build the project: `$> docker-compose build`

To run the project: `$> docker-compose up`

### **Google Cloud Platform**

Google Cloud Platform is uses for **production environment only**.

Every time a push or a pull requested is validated by ***Travis CI*** all the services are pushed to the productions servers.

Each push create a new versions of the APIs and the Frontend service.

The production environment dashboard is accessible at: `https://pedafy.com`
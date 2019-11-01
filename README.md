# **Dashboard Epitech**

## **Authors**

- florent.poinsard@epitech.eu
- julien.ferrier@epitech.eu

## **Architecture *(the big pitcure)***

Our project is divided into multiple micro-services.

This architecture allows us to work faster and code API that are scalable and that we can easily manage.

This kind of architecture (micro-services) is used more and more by tech companies. It allows :
- Better team organisation.
- Less frustration between teams.
- Less errors in code and production environment.
- The ability to code with different programming language, making it easier to use the right programming language for the right situation.

### **The services**

- Users API ([documentation](./api/users/README.md))
- Widget API ([documentation](./api/widget/README.md))
- {Service 1} API
- {Service 2} API
- {Service 3} API
- Frontend

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
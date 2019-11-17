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
- News Service API ([documentation](./api/news/README.md))
- Intranet Epitech Service API ([documentation](./api/intra/README.md))
- Currency API ([documentation](./api/currency/README.md))
- GitHub API ([documentation](./api/github/README.md))
- Frontend ([documentation](./docs/doc_ui_ux_dashboard.pdf))

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

## **Frontend**

The frontend (main application) is available at `http://localhost` (on local env).

We used ReactJS. Why did we?

We decided to use ReactJS beceause it is a framework used by more and more companies. It is a nice assets to know how to use this technology when looking for a job. Also, it is a easy framework and does not require a lot of work to get around it.

## **Bonuses**

- Micro services Architecture.
    - 10 independant services.
    - 12 factors app.
    - Each API respects ISO rules and follow the Richardson Maturity Mode. 

- Deploiement
    - Travis CI deploys automatically to Google App Engine every single services

- Database
    - Usage of MySQL database
    - PhpMyAdmin

- Environment
    - Two environment (Dev and Prod)
    - Production servers
        - 1 server for each service/API (beside PMA and SQL) for a total of 9 servers
        - Code automatically pushed and run on servers for every push on branch master
        - Managment of DNS
        - SSL certificat
        - Multiple routes (defines at the root of the repo './dispatch.yaml')

- GitHub
    - Huge usage of issue
    - Huge usage of PR
    - Daily meeting reports

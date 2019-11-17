# Bonuses

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
